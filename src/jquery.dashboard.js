/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false, _: false */
(function ($) {
    $.fn.extend({
        dashboard: function (options) {
            options = options || {};

            return this.each(function () {
                var defaultUrl,
                    requests,
                    compiledTemplate,
                    currentPage,
                    totalPages,
                    perPage,
                    headers,
                    thumbnailUrl,
                    noFormUrl,
                    self;

                currentPage = 0;
                perPage = 10;

                self = this;
                defaultUrl = 'https://' + (options.staging ? 'staging.' : '') + 'api.covermymeds.com/requests/search?v=' + options.version;

                $(this).html('<h3>Loading...</h3>');

                thumbnailUrl = 'https://www.covermymeds.com/forms/pdf/thumbs/90/highmark_west_virginia_prescription_drug_medication_6827.jpg';
                noFormUrl = 'https://www.covermymeds.com/styles_r2/images/pick_the_form.png';

                compiledTemplate = _.template('<table class="table table-striped requests">' +
                                    '<% _.each(requests, function (request) { %>' +
                                      '<tr>' +
                                        '<td class="form-thumbnail">' +
                                            '<% if (request.form_id) { %>' +
                                            '<img src="' + thumbnailUrl + '">' +
                                            '<% } else { %>' +
                                            '<img src="' + noFormUrl + '">' +
                                            '<% } %>' +
                                        '</td>' +
                                        '<td>' +
                                            '<h4><%= request.patient.first_name %> <%= request.patient.last_name %> (Key: <%= request.id %>)</h4>' +
                                            '<dl class="dl-horizontal request-details">' +
                                                '<dt>Status</dt><dd><span class="label label-info"><%= request.workflow_status %></span></dd>' +
                                                '<dt>Drug</dt><dd><%= request.prescription.name || "(Missing)" %></dd>' +
                                                '<dt>Created</dt><dd><%= new Date(Date.parse(request.created_at)).toLocaleDateString() %></dd>' +
                                                '<dt>Link</dt><dd><a href="<%= request.tokens[0].html_url %>">View on CoverMyMeds.com &rarr;</a></dd>' +
                                           '</dl>' +
                                        '</td>' +
                                      '</tr>' +
                                    '<% }); %>' +
                                    '</table>' +
                                    // Pagination
                                    '<% if (totalPages > 1) { %>' +
                                    '<ul class="pagination">' +
                                    '<% for (var i = 0; i < totalPages; i += 1) { %>' +
                                    '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>' +
                                    '<% } %>' +
                                    '</ul>' +
                                    '<% } %>');

                function paginationCallback(event) {
                    var begin,
                        end;

                    event.preventDefault();

                    currentPage = parseInt($(event.target).attr('href'), 10);

                    // Get beginning/end of results to display
                    begin = currentPage * perPage;
                    end = begin + perPage;

                    $(self).empty().append(compiledTemplate({ requests: requests.slice(begin, end), currentPage: currentPage, totalPages: totalPages }));
                    $('.pagination a').on('click', paginationCallback);
                }

                function displayResults(data) {
                    requests = data.requests;
                    totalPages = Math.ceil(requests.length / perPage);
                    $(self).empty().append(compiledTemplate({ requests: requests.slice(0, perPage), currentPage: currentPage, totalPages: totalPages }));
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

