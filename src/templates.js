/*jslint sloppy: true, nomen: true, white: true */
/*global window: false, _: false */
(function() {
    window.JST = {};

    window.JST.dashboard = _.template([
        '<div class="row">',
          '<div class="navigation col-md-3">',
            '<div class="order btn-group btn-group-justified">',
              '<div class="btn-group"><button type="button" data-direction="desc" class="btn btn-default active">Newest First</button></div>',
              '<div class="btn-group"><button type="button" data-direction="asc" class="btn btn-default">Oldest First</button></div>',
            '</div>',
            '<hr>',
            '<ul class="folders nav nav-pills nav-stacked">',
            '<% _.each(folders, function (folder, name) { %>',
              '<li class="<%= name === currentFolder ? "active" : "" %>"><a href="#<%= name %>"><span class="glyphicon glyphicon-folder-close"></span> <%= name %> <span class="badge pull-right"><%= folder.data.length %></span></a></li>',
              '<% }); %>',
            '</ul>',
            '<hr>',
            '<form action="#" class="well" method="get" role="form">',
              '<fieldset>',
                '<legend>Search</legend>',
                  '<div class="input-group">',
                    '<input class="form-control search" name="q" placeholder="Search" type="search">',
                    '<span class="input-group-btn">',
                      '<button class="clear btn btn-default" type="button"><span class="clear glyphicon glyphicon-remove"></span></button>',
                    '</span>',
                  '</div>',
              '</fieldset>',
            '</form>',
          '</div>',
          '<div class="content col-md-9">',
          '</div> <!-- /.content -->',
        '</div> <!-- /.row -->'
        ].join(''));

window.JST.dashboardContent = _.template([
    '<table class="table table-striped requests">',
    '<% if (requests.length === 0) { %>',
      '<tr>',
        '<td><h4>No Results</h4></td>',
      '</tr>',
    '<% } %>',
    '<% _.each(requests, function (request) { %>',
      '<tr>',
        '<td class="form-thumbnail">',
        '<% if (request.form_id) { %>',
        '<img src="https://www.covermymeds.com/forms/pdf/thumbs/90/highmark_west_virginia_prescription_drug_medication_6827.jpg">',
        '<% } else { %>',
        '<img src="https://www.covermymeds.com/styles_r2/images/pick_the_form.png">',
        '<% } %>',
        '</td>',
        '<td>',
          '<h4><%= request.patient.first_name %> <%= request.patient.last_name %> (Key: <%= request.id %>)</h4>',
          '<dl class="dl-horizontal request-details">',
            '<dt>Status</dt><dd><span class="label label-info"><%= request.workflow_status %></span></dd>',
            '<dt>Drug</dt><dd><%= request.prescription.name || "(Missing)" %></dd>',
            '<dt>Created</dt><dd><%= new Date(Date.parse(request.created_at)).toLocaleDateString() %></dd>',
            '<dt>Link</dt><dd><a href="<%= request.tokens[0].html_url %>">View on CoverMyMeds.com &rarr;</a></dd>',
            '</dl>',
        '</td>',
      '</tr>',
      '<% }); %>',
    '</table>',
    '<% if (totalPages > 0) { %>',
    '<ul class="pagination">',
    '<% function insideWindow(page, currentPage) {',
          'var window = 2;',
          'return Math.abs(currentPage - page) <= window;',
        '} %>',
        '<% i = 0; %>',
        '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>',
        '<% if (!insideWindow(i + 1, currentPage)) { %>',
        '<li><a href="#">&hellip;</a></li>',
        '<% } %>',
        '<% for (i = 1; i <= totalPages - 1; i += 1) {',
          'if (insideWindow(i, currentPage)) { %>',
        '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>',
        '<% }',
        '} %>',
        '<% i = totalPages; %>',
        '<% if (!insideWindow(i - 1, currentPage)) { %>',
        '<li><a href="#">&hellip;</a></li>',
        '<% } %>',
        '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>',
        '</ul>',
    '<% } %>'
    ].join(''));

window.JST.formsearch = _.template([
    '<table class="table">',
      '<tr>',
        '<td><img src="<%= form.thumbnail_url %>"></td>',
        '<td><%= form.text %></td>',
      '</tr>',
    '</table>'
    ].join(''));

window.JST.action_button = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<button class=\'' +
        ((__t = ( action.slug() )) == null ? '' : __t) +
        ' btn\'>' +
        ((__t = ( action.title )) == null ? '' : __t) +
        '</button>\n';

    }
    return __p
};

window.JST.action_link = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<a class=\'' +
        ((__t = ( action.slug )) == null ? '' : __t) +
        ' btn\' href=\'' +
        ((__t = ( action.href )) == null ? '' : __t) +
        '\'>' +
        ((__t = ( action.title )) == null ? '' : __t) +
        '</a>\n';

    }
    return __p
};

window.JST.checkbox_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question checkbox ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n\n    <input type="checkbox"\n           id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n           name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n           value="' +
        ((__t = ( question.checked_value )) == null ? '' : __t) +
        '"\n           ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '\n    />\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n\n  </label>\n</div>\n\n';

    }
    return __p
};

window.JST.choice_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
    function print() { __p += __j.call(arguments, '') }
    with (obj) {
        __p += '<div class="question choice ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n  </label>\n\n  <select id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n          name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n          ' +
        ((__t = ( question.selectMultiple() )) == null ? '' : __t) +
        ' >\n    ';
        question.choices().forEach( function(choice){ ;
            __p += '\n      <option value="' +
            ((__t = ( choice.choice_id )) == null ? '' : __t) +
            '"\n              ' +
            ((__t = ( question.isSelected(choice) )) == null ? '' : __t) +
            ' >\n        ' +
            ((__t = ( choice.choice_text )) == null ? '' : __t) +
            '\n      </option>\n    ';
        }); ;
        __p += '\n  </select>\n\n</div>\n';

    }
    return __p
};

window.JST.date_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question date ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n  </label>\n\n  <input type="date"\n         id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         value="' +
        ((__t = ( question.value )) == null ? '' : __t) +
        '"\n         ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '\n  />\n</div>\n';

    }
    return __p
};

window.JST.file_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question file ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n  </label>\n\n  <input type="file"\n         id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         value="' +
        ((__t = ( question.value )) == null ? '' : __t) +
        '"\n         ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '\n  />\n</div>\n\n';

    }
    return __p
};

window.JST.form = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
    function print() { __p += __j.call(arguments, '') }
    with (obj) {
        __p += '<form class=\'request-pages-form\' method="POST">\n  ';
        form.questionSets.forEach( function(questionSet) { ;
            __p += '\n    ' +
            ((__t = ( questionSet.render() )) == null ? '' : __t) +
            '\n  ';
        }); ;
        __p += '\n\n  <fieldset class=\'controls\'>\n    '
        += '<input type=\'hidden\' class=\'form_action\' name=\'form_action\' value=\'\' />\n\n    ';
        form.actions.forEach( function(action) { ;
            __p += '\n      ' +
            ((__t = ( action.render() )) == null ? '' : __t) +
            '\n    ';
        }); ;
        __p += '\n  </fieldset>\n</form>\n';

    }
    return __p
};

window.JST.free_area_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question free-area ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n  </label>\n\n  <textarea\n    id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n    name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n    placeholder="' +
        ((__t = ( question.placeholder() )) == null ? '' : __t) +
        '"\n    ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        ' >\n\n    ' +
        ((__t = ( question.value )) == null ? '' : __t) +
        '\n\n  </textarea>\n</div>\n';

    }
    return __p
};

window.JST.free_text_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question free-text ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n  </label>\n\n  <input type="text"\n         id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         value="' +
        ((__t = ( question.value )) == null ? '' : __t) +
        '"\n         placeholder="' +
        ((__t = ( question.placeholder() )) == null ? '' : __t) +
        '"\n         ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '\n  />\n</div>\n';

    }
    return __p
};

window.JST.hidden_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<input type="hidden"\n  id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n  name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n  value="' +
        ((__t = ( question.value )) == null ? '' : __t) +
        '"\n/>\n';

    }
    return __p
};

window.JST.numeric_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question numeric ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n  </label>\n\n  <input type="number"\n         id="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         name="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '"\n         value="' +
        ((__t = ( question.value )) == null ? '' : __t) +
        '"\n         ' +
        ((__t = ( question.isRequired() )) == null ? '' : __t) +
        '\n  />\n</div>\n';

    }
    return __p
};

window.JST.question_set = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
    function print() { __p += __j.call(arguments, '') }
    with (obj) {
        __p += '<fieldset class=\'question-set\'>\n  <legend>' +
        ((__t = ( questionSet.title )) == null ? '' : __t) +
        '</legend>\n  ';
        questionSet.questions.forEach( function(question) { ;
            __p += '\n    ' +
            ((__t = ( question.render() )) == null ? '' : __t) +
            '\n  ';
        }); ;
        __p += '\n</fieldset>\n';

    }
    return __p
};

window.JST.statement_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question statement">\n  <label for="' +
        ((__t = ( question.questionId() )) == null ? '' : __t) +
        '">\n    ' +
        ((__t = ( question.questionText() )) == null ? '' : __t) +
        '\n  </label>\n\n  <p>\n    ' +
        ((__t = ( question.content_html() )) == null ? '' : __t) +
        '\n  </p>\n</div>\n';

    }
    return __p
};

window.JST.unknown_question = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="question">\n  Something went wrong (I don\'t know how to display a question of type "' +
            ((__t = ( question.questionType() )) == null ? '' : __t) +
            '").\n</div>\n';

}
return __p
};


}(window));
