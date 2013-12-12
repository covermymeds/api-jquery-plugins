/*jslint sloppy: true, unparam: true, todo: true */
/*global alert: false, jQuery: false */
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
                var onSelected;

                // TODO: Determine endpoint URL

                // Initialize typeahead.js
                $(this).typeahead({
                    name: 'drug_api',
                    header: 'Results',
                    remote: {
                        url: "https://staging.api.covermymeds.com/drugs?api_id=" + options.apiId + "&v=" + options.version + "&q=%QUERY",
                        filter: function (response) {
                            var i, j, data = [];

                            for (i = 0, j = response.drugs.length; i < j; i += 1) {
                                data.push({
                                    value: response.drugs[i].full_name,
                                    id: response.drugs[i].id
                                });
                            }

                            return data;
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
