
(function($) {
  $.fn.showRequestPagesForm = function(options) {
    $.each(this, _.bind(function() {
      var requestPages   = new RequestPages(options);
      requestPages.container = this;
      requestPages.showForm();
    }, this));
    return this;
  };
}(jQuery));

window.RequestPages = function(options) {

  this.defaultSelector = '.request-pages';
  this.container       = $(this.defaultSelector);

  this.version = options.version || 1;
  this.apiId = options.apiId || '';
  this.tokenId = options.tokenId || '';
  this.requestId = options.requestId || '';

  this.resourceUrl = options.url || 'https://' + (options.debug ? 'staging.' : '') + 'api.covermymeds.com/request-pages/' + this.requestId + 
    '?v=' + this.version + '&api_id=' + this.apiId + '&token_id=' + this.tokenId;
  console.log("this is the resourceURL "+this.resourceUrl);
  
  this._getSuccessCallback = _.bind(function(data) {
    this.form = new RequestPages.Form(data['request_page']['forms'], data['request_page']['data'], data['request_page']['actions']);
    $(this.container).html(this.form.render());
    $(this.container).find('form').on('submit', _.bind(function(e) {
      this.postForm();
      return false;
    }, this));

  }, this);

  this.showForm = _.bind(function() {
    $.get(this.resourceUrl, this._getSuccessCallback);

  }, this);

  this.postForm = _.bind(function() {
    $.post(
      this.resourceUrl,
      $(this.container).find('form').serialize(),
      this._getSuccessCallback );

  }, this);

};

window.RequestPages.Form = function(formsJson, currentValues, actions) {
  this.actionsJson   = actions;

  this.template = 'form';

  this.name = _.bind(function() {
    return Object.keys(formsJson)[0];

  }, this);

  this.formJson      = formsJson[this.name()];
  this.currentValues = currentValues[this.name()];

  this.questionSets = [];
  this.formJson['question_sets'].forEach(_.bind(function(questionSet) {
      this.questionSets.push(
        new RequestPages.QuestionSet(questionSet, this.currentValues)
      );

    }, this));

  this.actions = [];
  this.actionsJson.forEach(_.bind(function(action) {
    this.actions.push( new RequestPages.Form.Action(action) );

  }, this));

  this.find_question_by_id = _.bind(function(questionId) {
    var foundQuestion = {};
    this.questionSets.forEach(_.bind(function(questionSet) {
      questionSet.questions.forEach(_.bind(function(question) {
        if (question.questionId() === questionId) {
          return foundQuestion = question;
        }
      }, this));
    }, this));
    return foundQuestion;
  }, this);

  this.render = _.bind(function() {
    return JST[this.template]({ form: this });
  }, this);

};

window.RequestPages.Form.Action = function(actionJson) {
  this.ref    = actionJson[ 'ref'    ];
  this.title  = actionJson[ 'title'  ];
  this.href   = actionJson[ 'href'   ];
  this.method = actionJson[ 'method' ];

  this.template = 'action_button';

  this.slug = _.bind(function() {
    return this.title.toLowerCase().replace(/[\s\/]+/g, '_');
  }, this);

  this._addHandler = _.bind(function() {
    var btnSelector = 'button.' + this.slug();
    $('.request-pages').on('click', btnSelector, _.bind(function(e) {
      $('input.form_action').val(this.title);
    }, this));
  }, this);

  this.render = _.bind(function() {
    this._addHandler();
    return JST[this.template]({ action: this });
  }, this);
};

window.RequestPages.QuestionSet = function(questionSetJson, currentValues) {
  this.title = questionSetJson['title'];

  this.template = 'question_set';

  this.questions = [];
  questionSetJson['questions'].forEach(_.bind(function(questionJson) {
    var currentValue;
    currentValue = currentValues[questionJson['question_id']];
    return this.questions.push(RequestPages.Question.create(questionJson, currentValue));
  }, this));

  this.render = _.bind(function() {
    return JST[this.template]({ questionSet: this });
  }, this);

};

window.RequestPages.Question = function(questionJson, currentValue) {
  if (currentValue == null) {
    currentValue = '';
  }
  this.dna = questionJson;
  this.value = currentValue;

  this.template = 'unknown_question';

  this.questionType = _.bind(function() { return this.dna.question_type; }, this);
  this.questionText = _.bind(function() { return this.dna.question_text; }, this);
  this.questionId   = _.bind(function() { return this.dna.question_id;   }, this);
  this.helpText     = _.bind(function() { return this.dna.help_text;     }, this);
  this.defaultNextQuestionId =
    _.bind(function() { return this.dna.default_next_question_id; }, this);


  this.isRequired = _.bind(function() {
    if (this.dna.flag === 'REQUIRED') {
      return 'required';
    } else {
      return '';
    }
  }, this);

  this.render = _.bind(function() {
    return JST[this.template]({
      question: this
    });
  }, this);

};

window.RequestPages.Question.create = function(questionJson, currentValue) {
  if (currentValue == null) {
    currentValue = '';
  }

  var questionFactory = (function() {
    switch (questionJson['question_type']) {
      case 'FREE_TEXT':
        return RequestPages.Question.FreeText;
      case 'CHOICE':
        return RequestPages.Question.Choice;
      case 'DATE':
        return RequestPages.Question.Date;
      case 'NUMERIC':
        return RequestPages.Question.Numeric;
      case 'STATEMENT':
        return RequestPages.Question.Statement;
      case 'HIDDEN':
        return RequestPages.Question.Hidden;
      case 'FILE':
        return RequestPages.Question.File;
      case 'CHECKBOX':
        return RequestPages.Question.Checkbox;
      case 'FREE_AREA':
        return RequestPages.Question.FreeArea;
      default:
        return function(question) { return question; };
    }
  })();

  return questionFactory(new RequestPages.Question(questionJson, currentValue));

};

window.RequestPages.Question.init = function() {};

window.RequestPages.Question.Checkbox = function(question) {

  question.template = 'checkbox_question';

  return question;
};

window.RequestPages.Question.Choice = function(question) {

  question.template = 'choice_question';

  question.selectMultiple = _.bind(function() {
    if (this.dna.select_multiple) {
      return 'multiple';
    } else {
      return '';
    }
  }, question);

  question.choices = _.bind(function() {
    return this.dna.choices;
  }, question);

  question.isSelected = _.bind(function(choice) {
    if (choice.choice_id === this.value) {
      return 'selected';
    } else {
      return '';
    }
  }, question);

  return question;
};

window.RequestPages.Question.Date = function(question) {

  question.template = 'date_question';

  return question;
};

window.RequestPages.Question.File = function(question) {

  question.template = 'file_question';

  return question;
};

window.RequestPages.Question.FreeArea = function(question) {

  question.template = 'free_area_question';

  question.placeholder = _.bind(function() {
    return this.dna.placeholder;
  }, question);

  return question;
};

window.RequestPages.Question.FreeText = function(question) {

  question.template = 'free_text_question';

  question.placeholder = _.bind(function() {
    return this.dna.placeholder;
  }, question);

  return question;
};

window.RequestPages.Question.Hidden = function(question) {

  question.template = 'hidden_question';

  return question;
};

window.RequestPages.Question.Numeric = function(question) {

  question.template = 'numeric_question';

  return question;
};

window.RequestPages.Question.Statement = function(question) {

  question.template = 'statement_question';

  question.content_plain = _.bind(function() {
    return this.dna.content_plain;
  }, question);

  question.content_html = _.bind(function() {
    return this.dna.content_html;
  }, question);

  return question;
};
