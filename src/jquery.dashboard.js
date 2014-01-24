/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false, JST: false */
(function ($) {
    $.fn.extend({
        dashboard: function (options) {
            options = options || {};

            return this.each(function () {
                var defaultUrl,
                    requests,
                    currentPage,
                    totalPages,
                    perPage,
                    self;

                currentPage = 0;
                perPage = 10;

                self = this;
                defaultUrl = 'https://' + (options.debug ? 'staging.' : '') + 'api.covermymeds.com/requests/search?v=' + options.version;

                $(this).html('<h3>Loading...</h3>');

                function paginationCallback(event) {
                    var begin,
                        end;

                    event.preventDefault();

                    currentPage = parseInt($(event.target).attr('href'), 10);

                    if (isNaN(currentPage)) {
                        return;
                    }

                    // Get beginning/end of results to display
                    begin = currentPage * perPage;
                    end = begin + perPage;

                    $(self).empty().append(JST.dashboard({ requests: requests.slice(begin, end), currentPage: currentPage, totalPages: totalPages }));
                    $('.pagination a').on('click', paginationCallback);
                }

                function displayResults(data) {
                    requests = data.requests;
                    totalPages = Math.ceil(requests.length / perPage) - 1; // 0-index based
                    $(self).empty().append(JST.dashboard({ requests: requests.slice(0, perPage), currentPage: currentPage, totalPages: totalPages }));
                    $('.pagination a').on('click', paginationCallback);
                }

                // Don't make Ajax request if data is pre-supplied
                if (options.data) {
                    displayResults(options.data);
                } else {
                    $.ajax({
                        url: options.url || defaultUrl,
                        type: 'POST',
                        data: {
                            ids: options.ids
                        },
                        beforeSend: function (xhr, settings) {
                            if (!options.url) {
                                xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(options.apiId + ':' + options.apiSecret));
                            }
                        },
                        success: displayResults,
                        error: function (data, status, xhr) {
                            $(self).empty().text('There was an error processing your request. Please try again.');
                        }
                    });
                }
            });
        }
    });
}(jQuery));

