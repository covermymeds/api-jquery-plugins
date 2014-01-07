/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false, _: false */
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
                    headers,
                    self;

                currentPage = 0;
                perPage = 10;

                self = this;
                defaultUrl = 'https://' + (options.staging ? 'staging.' : '') + 'api.covermymeds.com/requests/search?v=' + CMM_API_CONFIG.version;
                headers = options.url ? {} : { 'Authorization': 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret) };

                $(this).html('<h1>Loading...</h1>');

                $.ajax({
                    url: options.url || defaultUrl,
                    type: 'POST',
                    headers: headers,
                    data: {
                        ids: options.ids
                    },
                    success: function (data, status, xhr) {
                        var compiled;

                        requests = data.requests;
                        console.log("requests length: ", requests.length);
                        totalPages = Math.ceil(requests.length / perPage);

                        compiled = _.template('<% _.each(requests, function (request) { %>' +
                                              '<div class="request row">' +
                                                '<div class="col-lg-2">' +
                                                    '<img src="<%= request.thumbnail_urls %>" />' +
                                                '</div>' +
                                                '<div class="col-lg-4">' +
                                                    '<ul>' +
                                                        '<li><h4><%= request.patient.first_name %> <%= request.patient.last_name %> (Key: <%= request.id %>)</h4></li>' +
                                                        '<li><strong>Status:</strong> <span class="label label-info"><%= request.workflow_status %></span>' +
                                                        '<li>Drug Name Here</li>' +
                                                        '<li><strong>Created:</strong> <%= request.created_at %></li>' +
                                                        '<li><a href="<%= request.tokens[0].html_url %>">View</a></li>' +
                                                   '</ul>' +
                                                '</div>' +
                                              '</div><% }); %>' +
                                                // Pagination
                                                '<% if (totalPages > 1) { %>' +
                                                '<ul class="pagination">' +
                                                '<% for (var i = 0; i < totalPages; i += 1) { %>' +
                                                '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>' +
                                                '<% } %>' +
                                                '</ul>' +
                                                '<% } %>');

                        $(self).empty().append(compiled({ requests: requests.slice(0, perPage), currentPage: currentPage, totalPages: totalPages }));

                        function callback(event) {
                            var begin,
                                end;

                            event.preventDefault();

                            currentPage = parseInt($(event.target).attr('href'), 10);

                            // Get beginning/end of results to display
                            begin = currentPage * perPage;
                            end = begin + perPage;

                            $(self).empty().append(compiled({ requests: requests.slice(begin, end), currentPage: currentPage, totalPages: totalPages }));
                            $('.pagination a').on('click', callback);
                        }

                        $('.pagination a').on('click', callback);
                    },
                    error: function (data, status, xhr) {
                        $('.modal-body').text('There was an error processing your request.');
                        $('.modal').modal();
                        $(self).empty();
                    }
                });
            });
        }
    });
}(jQuery));

