/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false, _: false */
(function ($) {
    $.fn.extend({
        dashboard: function (options) {
            options = options || {};

            return this.each(function () {
                var defaultUrl,
                    self;

                self = this;
                defaultUrl = 'https://staging.api.covermymeds.com/requests/search?v=' + CMM_API_CONFIG.version + '&api_id=' + CMM_API_CONFIG.apiId + '&api_secret=' + CMM_API_CONFIG.apiSecret;
                // headers = options.url ? {} : { 'Authorization': 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret) };

                $.ajax({
                    url: options.url || defaultUrl,
                    type: 'POST',
                   // headers: headers,
                    data: {
                        ids: options.ids
                    },
                    success: function (data, status, xhr) {
                        var compiled;

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
                                              '</div><% }); %>');

                        $(self).append(compiled(data));
                    },
                    error: function (data, status, xhr) {
                        $('.modal-body').text('There was an error processing your request.');
                        $('.modal').modal();
                    }
                });


            });
        }
    });
}(jQuery));

