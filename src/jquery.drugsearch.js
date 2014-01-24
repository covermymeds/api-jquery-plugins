/*jslint sloppy: true, unparam: true, todo: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false */
(function ($) {
    $.fn.extend({
        drugSearch: function (options) {
            options = options || {};

            // Remove plugins/event handlers
            if (options === 'destroy') {
                return this.each(function () {
                    $(this).select2('destroy');
                });
            }

            return this.each(function () {
                var defaultUrl;

                defaultUrl = 'https://' + (options.debug ? 'staging.' : '') + 'api.covermymeds.com/drugs?v=' + options.version;

                // Initialize select2
                $(this).select2({
                    placeholder: 'Begin typing the medication name and select from list',
                    minimumInputLength: 4,
                    ajax: {
                        quietMillis: 250,
                        url: options.url || defaultUrl,
                        transport: function (params) {
                            // Add authorization header if directly querying API;
                            // otherwise we assume our custom URL will handle authorization
                            if (!options.url) {
                                params.beforeSend = function (xhr) {
                                    xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(options.apiId + ':' + options.apiSecret));
                                };
                            }

                            return $.ajax(params);
                        },
                        data: function (term, page) {
                            return {
                                q: term
                            };
                        },
                        results: function (data, page) {
                            var results = [],
                                more,
                                i,
                                j;

                            more = (page * 10) < data.total;

                            for (i = 0, j = data.drugs.length; i < j; i += 1) {
                                results.push({
                                    text: data.drugs[i].full_name,
                                    id: data.drugs[i].id
                                });
                            }

                            return {
                                results: results,
                                more: more
                            };
                        }
                    }
                });
            });
        }
    });
}(jQuery));
