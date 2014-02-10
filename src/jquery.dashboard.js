/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false, JST: false, _: false */

/*
TODO:
    1. Add folders by "status," with counts on each one
    2. Add sort order by date
    3. Single "live" search field
*/

(function ($) {
    // String.trim() polyfill
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/gm, '');
        };
    }

    /**
     * @constructor
     */
    var CmmDashboard = function (options) {
        // Ensure 'this' -> 'CmmDashboard' in all these methods
        _.bindAll(this, 'load', 'sort', 'filter', 'render', 'paginate', 'search', 'selectFolder', 'order', 'bindEvents', 'unbindEvents');

        this.elem = options.elem;   // jQuery object to draw into
        this.url = options.url;
        this.defaultUrl = 'https://' + (options.debug ? 'staging.' : '') + 'api.covermymeds.com/requests/search?v=' + options.version;

        this.ids = options.ids || [];
        this.apiId = options.apiId || '';
        this.apiSecret = options.apiSecret || '';

        this.currentPage = 0;
        this.perPage = 10;

        this.currentFolder = 'All';
        this.folders = {
            'All': { workflow_statuses: ["New", "Shared", "Shared \\ Accessed Online", "Appealed", "Sent to Plan"], data: [] },
            'New': { workflow_statuses: ["New", "Shared", "Shared \\ Accessed Online"], data: [] },
            'Open': { workflow_statuses: ["Appealed", "Sent to Plan"], data: [] }
        };

        this.currentOrder = 'desc';

        if (options.data === undefined) {
            this.load(_.bind(function () {
                this.sort();
                this.filter();
                this.render();
            }, this));
        } else {
            this.data = options.data;
            this.sort();
            this.filter();
            this.render();
        }
    };

    /**
     * @description Load data for dashboard to display
     */
    CmmDashboard.prototype.load = function (callback) {
        var self = this;

        this.elem.html('<h3>Loading...</h3>');

        $.ajax({
            url: this.url || this.defaultUrl,
            type: 'POST',
            data: {
                ids: this.ids
            },
            beforeSend: function (xhr, settings) {
                if (self.url === undefined) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(self.apiId + ':' + self.apiSecret));
                }
            },
            success: function (data, status, xhr) {
                self.data = data.requests;

                if (typeof callback === 'function') {
                    callback();
                }
            },
            error: function (data, status, xhr) {
                self.elem.empty().text('There was an error processing your request. Please try again.');
            }
        });
    };

    /**
     * @description Sort by "created_at" timestamp - newer first
     */
    CmmDashboard.prototype.sort = function () {
        var self = this;

        _.each(this.data, function sortIntoFolders(request) {
            _.each(self.folders, function (folder, name) {
                if (folder.workflow_statuses.indexOf(request.workflow_status) !== -1) {
                    folder.data.push(request);
                }
            });
        });

        this.data.sort(function sortByDate(a, b) {
            if (a.created_at === b.created_at) {
                return 0;
            }

            return a.created_at < b.created_at ? 1 : -1;
        });
    };

    /**
     * @description Filter data based on search input
     */
    CmmDashboard.prototype.filter = function (clear) {
        var data,
            request,
            i,
            j;

        data = this.folders[this.currentFolder].data;

        // Clear out previous filtered values
        this.filteredData = [];
        this.searchQuery = $('input[name=q]').val() || '';
        this.searchQuery = this.searchQuery.trim().toLowerCase();

        // Just use default data if no search query
        if (this.searchQuery === '') {
            this.filteredData = data;
            return;
        }

        for (i = 0, j = data.length; i < j; i += 1) {
            request = data[i];

            // determine if request matches any of the searchable fields - first/last name, dob, drug name, or PA key (id)
            // Only add the request one time if there's any kind of match
            if (request.patient.first_name.toLowerCase().indexOf(this.searchQuery) !== -1) {
                this.filteredData.push(request);
            } else if (request.patient.last_name.toLowerCase().indexOf(this.searchQuery) !== -1) {
                this.filteredData.push(request);
            } else if (request.patient.date_of_birth.toLowerCase().indexOf(this.searchQuery) !== -1) {
                this.filteredData.push(request);
            } else if (request.prescription.name && request.prescription.name.toLowerCase().indexOf(this.searchQuery) !== -1) {
                this.filteredData.push(request);
            } else if (request.id.toLowerCase().indexOf(this.searchQuery) !== -1) {
                this.filteredData.push(request);
            }
        }
    };

    /**
     * @description Write main template to DOM
     */
    CmmDashboard.prototype.render = function () {
        // Render main template to DOM
        this.elem.html(JST.dashboard({ folders: this.folders, currentFolder: this.currentFolder }));

        // Display content
        this.displayContent();

        this.bindEvents();
    };

    /**
     * @description Set up event handlers
     */
    CmmDashboard.prototype.bindEvents = function () {
        // Handle pagination
        $('.pagination a', this.elem).on('click', this.paginate);

        // Handle searching
        $('input.search', this.elem).on('keyup', _.debounce(this.search, 500));
        $('button.clear', this.elem).on('click', this.search);

        // Handle folder selection
        $('.folders a', this.elem).on('click', this.selectFolder);

        // Handle date ordering
        $('.order button', this.elem).on('click', this.order);
    };

    /**
     * @description Remove event handlers
     */
    CmmDashboard.prototype.unbindEvents = function () {
        // Handle pagination
        $('.pagination a', this.elem).off('click', this.paginate);

        // Handle searching
        $('input.search', this.elem).off('keyup', _.debounce(this.search, 500));
        $('button.clear', this.elem).off('click', this.search);

        // Handle folder selection
        $('.folders a', this.elem).off('click', this.selectFolder);

        // Handle date ordering
        $('.order button', this.elem).off('click', this.order);
    };

    /*
     * @description Reverse sort order of requests
     */
    CmmDashboard.prototype.order = function (event) {
        var button = $(event.target);

        if (this.currentOrder !== button.data('direction')) {
            button.addClass('active').parent('div').siblings('div').children('button').removeClass('active');
            this.currentOrder = button.data('direction');
            _.each(this.folders, function (folder) {
                folder.data.reverse();
            });
            this.displayContent();
        }
    };

    /**
     * @description Handle changing sub-folders of requests
     */
    CmmDashboard.prototype.selectFolder = function (event) {
        var folder = $(event.target);

        event.preventDefault();

        $('.folders li', this.elem).removeClass('active');
        folder.parent('li').addClass('active');
        this.currentFolder = folder.attr('href').substring(1);
        this.currentPage = 0;
        this.filter();
        this.displayContent();
    };

    /**
     * @description Handle search form input
     */
    CmmDashboard.prototype.search = function (event) {
        var target = $(event.target);
        event.preventDefault();

        if (target.hasClass('clear')) {
            $('input[name=q]', this.elem).val('');
        }

        this.currentPage = 0;
        this.filter();
        this.displayContent();
    };

    /**
     * @description Handle changing pages for request results
     */
    CmmDashboard.prototype.paginate = function (event) {
        var page,
            button;

        event.preventDefault();
        button = $(event.target);

        page = parseInt(button.attr('href'), 10);

        if (isNaN(page)) {
            return;
        }

        this.currentPage = page;
        this.displayContent();
    };

    /**
     * @description Write current page of requests to the DOM
     */
    CmmDashboard.prototype.displayContent = function () {
        var begin,
            end,
            totalPages;

        begin = this.currentPage * this.perPage;
        end = begin + this.perPage;
        totalPages = Math.ceil(this.filteredData.length / this.perPage) - 1; // 0-index based

        // Render to DOM
        $('.content', this.elem).html(JST.dashboardContent({ requests: this.filteredData.slice(begin, end), currentPage: this.currentPage, totalPages: totalPages }));
    };

    $.fn.extend({
        dashboard: function (options) {
            // Remove event handler created by this plugin
            if (options === 'destroy') {
                return this.each(function () {
                    var elem = $(this),
                        dashboard = elem.data('dashboard');

                    if (dashboard) {
                        dashboard.unbindEvents();
                    }

                    elem.remove();
                });
            }

            return this.each(function () {
                var elem = $(this);
                options = $.extend(options, { elem: elem });
                elem.data('dashboard', new CmmDashboard(options));
            });
        }
    });
}(jQuery));

