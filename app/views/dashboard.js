/*jslint sloppy: true, unparam: true, nomen: true */
/*global require: false, module: false, window: false */

// String.trim() polyfill
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/gm, '');
    };
}

var Base64 = require('../vendor/base64.js'),
    _ = require('underscore'),
    template = require('../templates/dashboard.html'),
    contentTemplate = require('../templates/dashboard-content.html'),
    $ = require('jquery'),
    moment = require('moment');

/**
 * @constructor
 */
var CoverMyDashboard = function (options) {
    this.elem = options.elem;
    this.url = options.url;
    this.defaultUrl = 'https://api.covermymeds.com/requests/search?v=' + options.version;

    this.tokenIds = options.tokenIds || [];
    this.apiId = options.apiId || '';

    this.currentPage = 0;
    this.perPage = 10;

    this.currentOrder = 'newest';

    this.q = '';

    this.currentFolder = 'All';
    this.folders = {
        'All': { workflow_statuses: ["New", "Shared", "Shared \\ Accessed Online", "Appealed", "Sent to Plan", 'Archived'], count: 0 },
        'New': { workflow_statuses: ["New", "Shared", "Shared \\ Accessed Online"], count: 0 },
        'Open': { workflow_statuses: ["Appealed", "Sent to Plan"], count: 0 },
        'Archived': { workflow_statuses: ['Archived'], count: 0 }
    };

    this.render();

    // Ensure 'this' -> 'CoverMyDashboard' in all these methods
    _.bindAll(this, 'processData', 'renderContent', 'selectPage', 'search', 'clearSearch', 'selectFolder', 'changeOrder', 'filter');
    this.search = _.debounce(this.search, 500);
    this.bindEvents();

    if (options.requests === undefined) {
        this.loadData();
    } else {
        this.processData(options.requests);
        this.renderContent();
    }
};

/**
 * @description Set up event handlers
 */
CoverMyDashboard.prototype.bindEvents = function () {
    $('.content', this.elem).on('click', '.pagination a', this.selectPage);
    $('input.search', this.elem).on('keyup', this.search);
    $('button.clear', this.elem).on('click', this.clearSearch);
    $('.folders a', this.elem).on('click', this.selectFolder);
    $('.order a', this.elem).on('click', this.changeOrder);
};

/**
 * @description Count workflow statuses for each PA
 */
CoverMyDashboard.prototype.updateFolderCount = function () {
    var self = this;

    _(this.requests).each(function (request) {
        _(self.folders).each(function (folder, name) {
            if (_(folder.workflow_statuses).contains(request.workflow_status)) {
                folder.count += 1;
            }
        });
    });

    _(this.folders).each(function (folder, name) {
        $('#folder-' + name.toLowerCase() + '-count', self.elem).html(folder.count);
    });
};

/**
 * @description Load data for dashboard to display
 */
CoverMyDashboard.prototype.loadData = function (callback) {
    var self = this;

    $('.content', this.elem).html('<h3>Loading...</h3>');

    return $.ajax({
        method: 'POST',
        url: this.url || this.defaultUrl,
        data: { token_ids: this.tokenIds },
        beforeSend: function (xhr, settings) {
            if (self.url === undefined) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + self.apiId + '+');
            }
        }
    }).done(function (data, status, xhr) {
        self.processData(data.requests);
        self.renderContent();
    }).fail(function (xhr, status, errorThrown) {
        $('.content', self.elem).html('There was an error processing your request. Please try again.');
    });
};

CoverMyDashboard.prototype.processData = function (requests) {
    this.requests = requests;

    this.requests.sort(function sortByDate(a, b) {
        if (a.created_at === b.created_at) {
            return 0;
        }
        return a.created_at < b.created_at ? 1 : -1;
    });

    this.updateFolderCount();
};

/**
 * @description Write main template to DOM
 */
CoverMyDashboard.prototype.render = function () {
    var compiledTemplate = template({
        folders: this.folders,
        currentFolder: this.currentFolder,
        active: function (one, two) {
            if (one === two) {
                return "active";
            }
            return "";
        }
    });

    this.elem.html(compiledTemplate);
};

/**
 * @description Write current page of requests to the DOM
 */
CoverMyDashboard.prototype.renderContent = function () {
    var requests,
        begin,
        end,
        totalPages,
        compiledTemplate;

    requests = _(this.requests).filter(this.filter);
    begin = this.currentPage * this.perPage;
    end = begin + this.perPage;
    totalPages = Math.ceil(requests.length / this.perPage) - 1; // 0-index based

    compiledTemplate = contentTemplate({
        requests: requests.slice(begin, end),
        currentPage: this.currentPage,
        totalPages: totalPages,
        moment: moment,
        active: function (one, two) {
            if (one === two) {
                return "active";
            }
            return "";
        },
        insideWindow: function (page, currentPage) {
            return Math.abs(currentPage - page) <= 2;
        }
    });

    $('.content', this.elem).html(compiledTemplate);
};

/*
 * @description Change sort order of requests
 */
CoverMyDashboard.prototype.changeOrder = function (event) {
    event.preventDefault();

    var element = $(event.target),
        order = element.data('order');

    if (order === this.currentOrder) {
        return;
    }

    this.highlight(element);
    this.currentOrder = order;
    this.requests.reverse();

    this.renderContent();
};

/**
 * @description Handle changing sub-folders of requests
 */
CoverMyDashboard.prototype.selectFolder = function (event) {
    event.preventDefault();

    var element = $(event.target),
        folder = element.data('folder-name');

    if (folder === this.currentFolder) {
        return;
    }

    this.highlight(element);
    this.currentFolder = folder;
    this.currentPage = 0;

    this.renderContent();
};

/**
 * @description Handle search form input
 */
CoverMyDashboard.prototype.search = function (event) {
    var element = $(event.target),
        q = element.val();

    if (q === this.q) {
        return;
    }

    this.q = q;
    this.currentPage = 0;

    this.renderContent();
};

/**
 * @description Clear search input
 */
CoverMyDashboard.prototype.clearSearch = function () {
    var q = '';

    if (q === this.q) {
        return;
    }

    this.q = q;
    this.currentPage = 0;

    this.renderContent();
    $('input[name=q]', this.elem).val(this.q);
};

/**
 * @description Handle changing pages for request results
 */
CoverMyDashboard.prototype.selectPage = function (event) {
    event.preventDefault();

    var element = $(event.target),
        page = parseInt(element.data('page'), 10);

    if (isNaN(page)) {
        return;
    }

    this.currentPage = page;
    this.renderContent();
};

/**
 * @description Helper method to highlight active UI elements
 */
CoverMyDashboard.prototype.highlight = function (element) {
    element.parent('li').addClass('active').siblings('li').removeClass('active');
};


CoverMyDashboard.prototype.filter = function (request) {
    return this.searchFilter(request) && this.folderFilter(request);
};

CoverMyDashboard.prototype.folderFilter = function (request) {
    return _(this.folders[this.currentFolder].workflow_statuses).contains(request.workflow_status);
};

CoverMyDashboard.prototype.searchFilter = function (request) {
    var tokens = this.q.split(' '),
        self = this;

    return _(tokens).reduce(function (allMatched, token) {
        return allMatched && self.matchesToken(request, token);
    }, true);
};

CoverMyDashboard.prototype.matchesToken = function (request, token) {
    if (request.patient.first_name.toLowerCase().indexOf(token) !== -1 ||
            request.patient.last_name.toLowerCase().indexOf(token) !== -1 ||
            (request.patient.date_of_birth && request.patient.date_of_birth.toLowerCase().indexOf(token) !== -1) ||
            (request.prescription && request.prescription.name.toLowerCase().indexOf(token) !== -1) ||
            request.id.toLowerCase().indexOf(token) !== -1) {

        return true;
    }

    return false;
};

module.exports = function (options) {
    return this.each(function () {
        var elem = $(this);
        options = $.extend(options, { elem: elem });
        elem.data('dashboard', new CoverMyDashboard(options));
    });
};
