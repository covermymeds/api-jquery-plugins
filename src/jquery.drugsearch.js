/*jslint sloppy: true, unparam: true, todo: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false */
(function ($) {
    $.fn.extend({
        drugSearch: function (options) {
            options = options || {};

            if (options === 'destroy') {
                return this.each(function () {
                    $(this).typeahead('destroy');
                    $(this).off('typeahead:selected');
                    $(this).off('typeahead:autocompleted');
                });
            }

            return this.each(function () {
                var onSelected,
                    defaultUrl;

                defaultUrl = 'https://staging.api.covermymeds.com/drugs?v=' + CMM_API_CONFIG.version;

                // Initialize typeahead.js
                $(this).typeahead({
                    name: 'drug_api',
                    header: '<span class="dropdown-header">Results</span>',
                    remote: {
                        url: options.url ? options.url + '&q=%QUERY' : defaultUrl + '&q=%QUERY',
                        filter: function (response) {
                            var i, j, data = [];

                            for (i = 0, j = response.drugs.length; i < j; i += 1) {
                                data.push({
                                    value: response.drugs[i].full_name,
                                    id: response.drugs[i].id
                                });
                            }

                            return data;
                        },
                        beforeSend: function (xhr, settings) {
                            if (options.url) {
                                return;
                            }

                            xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret));
                        }
                    }
                });

                // Event callback for selecting/autocompleting a drug
                onSelected = function (event, datum, name) {
                    $(this).attr('data-drug-name', datum.value);
                    $(this).attr('data-drug-id', datum.id);
                };

                $(this).on('typeahead:selected', onSelected);
                $(this).on('typeahead:autocompleted', onSelected);

            });
        }
    });
}(jQuery));
