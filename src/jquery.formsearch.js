/*jslint sloppy: true, unparam: true, todo: true */
/*global Hogan: false, jQuery: false, CMM_API_CONFIG: false, Base64: false */
(function ($) {
    $.fn.extend({
        formSearch: function (options) {
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

                defaultUrl = 'https://staging.api.covermymeds.com/forms?v=' + CMM_API_CONFIG.version;

                // Initialize typeahead.js
                $(this).typeahead({
                    name: 'form_api',
                    header: 'Results',
                    template: '<p style="overflow: auto;"><img src="{{thumbnail_url}}" style="float: left;">{{value}}</p>',
                    engine: Hogan,
                    remote: {
                        url: options.url ? options.url + '&q=%QUERY&state=%STATE&drug_id=%DRUG_ID' : defaultUrl + '&q=%QUERY&state=%STATE&drug_id=%DRUG_ID',
                        replace: function(url, uriEncodedQuery) {
                            var state,
                                drugId;

                            state = options.state || $('select[name="request[state]"]').val();
                            drugId = options.drugId || $('input[name="request[drug_id]"]').data('drug-id');

                            return url.replace('%QUERY', uriEncodedQuery).replace('%STATE', state).replace('%DRUG_ID', drugId);
                        },
                        filter: function (response) {
                            var i, j, data = [];

                            for (i = 0, j = response.forms.length; i < j; i += 1) {
                                data.push({
                                    id: response.forms[i].request_form_id,
                                    value: response.forms[i].description,
                                    thumbnail_url: response.forms[i].thumbnail_url
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

                // Event callback for selecting/autocompleting a form
                onSelected = function (event, datum, name) {
                    $(this).attr('data-form-name', datum.value);
                    $(this).attr('data-form-id', datum.id);
                };

                $(this).on('typeahead:selected', onSelected);
                $(this).on('typeahead:autocompleted', onSelected);

            });
        }
    });
}(jQuery));
