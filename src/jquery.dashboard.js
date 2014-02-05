/*jslint sloppy: true, unparam: true, todo: true, nomen: true, plusplus: true, continue: true */
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

    var CmmDashboard = function (options) {
        // Ensure 'this' -> 'CmmDashboard' in all these methods
        _.bindAll(this, 'load', 'filter', 'render', 'paginate');

        this.elem = options.elem;   // jQuery object to draw into
        this.url = options.url;
        this.defaultUrl = 'https://' + (options.debug ? 'staging.' : '') + 'api.covermymeds.com/requests/search?v=' + options.version;

        this.ids = options.ids || [];
        this.apiId = options.apiId || '';
        this.apiSecret = options.apiSecret || '';

        this.currentPage = 0;
        this.perPage = 10;

        this.filters = {
            firstName: '',
            lastName: '',
            dob: '',
            drug: '',
            key: ''
        };

        if (options.data === undefined) {
            this.load(_.bind(function () {
                this.sort();
                this.filteredData = this.data;
                this.render();
            }, this));
        } else {
            this.data = options.data;
            this.sort();
            this.filteredData = this.data;
            this.render();
        }
    };

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

    // Sort by "created_at" timestamp - newer first
    // Only have to do this once, really - to change, just reverse the array
    CmmDashboard.prototype.sort = function () {
        this.data.sort(function (a, b) {
            if (a.created_at === b.created_at) {
                return 0;
            }

            return a.created_at < b.created_at ? 1 : -1;
        });
    };

    // Transform this.data -> this.filteredData
    CmmDashboard.prototype.filter = function (clear) {
        var request,
            i,
            j;

        if (clear === true) {
            this.searchQuery = null;
            this.filteredData = this.data;
            return;
        }

        // Clear out previous filtered values
        this.filteredData = [];
        this.searchQuery = $('input[name=q]').val().trim();

        for (i = 0, j = this.data.length; i < j; i += 1) {
            request = this.data[i];
            console.log(request.prescription.name);

            // determine if request matches any of the searchable fields - first/last name, dob, drug name, or PA key (id)
            // Only add the request one time if there's any kind of match
            if (request.patient.first_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1) {
                this.filteredData.push(request);
            } else if (request.patient.last_name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1) {
                this.filteredData.push(request);
            } else if (request.patient.date_of_birth.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1) {
                this.filteredData.push(request);
            } else if (request.prescription.name && request.prescription.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1) {
                this.filteredData.push(request);
            } else if (request.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1) {
                this.filteredData.push(request);
            }
        }
    };

    CmmDashboard.prototype.render = function () {
        var begin,
            end,
            totalPages;

        begin = this.currentPage * this.perPage;
        end = begin + this.perPage;
        totalPages = Math.ceil(this.filteredData.length / this.perPage) - 1; // 0-index based

        // Remove any previously-attached event handlers
        $('.pagination a', this.elem).off('click');
        $('button.search', this.elem).off('click');

        // Draw to DOM
        this.elem.empty().append(JST.dashboard({ requests: this.filteredData.slice(begin, end), currentPage: this.currentPage, totalPages: totalPages, q: this.searchQuery }));

        // Add event handlers
        $('.pagination a', this.elem).on('click', this.paginate);
        $('button.search', this.elem).on('click', _.bind(function (event) {
            event.preventDefault();

            var clear = $(event.target).hasClass('clear');

            this.filter(clear);
            this.render();
        }, this));
    };

    CmmDashboard.prototype.paginate = function (event) {
        var page;

        event.preventDefault();

        page = parseInt($(event.target).attr('href'), 10);

        if (isNaN(page)) {
            return;
        }

        this.currentPage = page;

        this.render();
    };

    $.fn.extend({
        dashboard: function (options) {
            // Remove event handler created by this plugin
            if (options === 'destroy') {
                return this.each(function () {
                    var elem = $(this);
                    $('.pagination a', elem).off('click');
                    $('button.search', elem).off('click');
                    elem.remove();
                });
            }

            return this.each(function () {
                options = $.extend(options, { elem: $(this) });
                new CmmDashboard(options);
            });
        }
    });
}(jQuery));

