(function ($) {
  $.fn.extend({
    formSearch: function (options) {
      if (options === 'destroy') {
        return this.each(function () {
          $(this).typeahead('destroy');
          $(this).off('typeahead:selected');
          $(this).off('typeahead:autocompleted');
        });
      } else if (options === undefined || options.apiId === undefined || options.version === undefined || options.state === undefined || options.drug_id === undefined) {
        alert('Missing API ID or Version number');
        return;
      }

      return this.each(function () {
        var onSelected;

        // Initialize typeahead.js
        $(this).typeahead({
          name: 'form_api',
          header: 'Results',
          template: '<p style="overflow: auto;"><img src="{{thumbnail_url}}" style="float: left;">{{value}}</p>',
          engine: Hogan,
          remote: {
            url: "https://staging.api.covermymeds.com/forms?api_id=%API_ID&v=%VERSION&q=%QUERY&state=%STATE&drug_id=%DRUG_ID",
            replace: function(url, uriEncodedQuery) {
              var state,
                  drugId;

              state = typeof options.state === 'function' ? options.state() : options.state;
              drugId = typeof options.drug_id === 'function' ? options.drug_id() : options.drug_id;

              return url.replace('%API_ID', options.apiId).replace('%VERSION', options.version).replace('%QUERY', uriEncodedQuery).replace('%STATE', state).replace('%DRUG_ID', drugId);
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
            }
          }
        });

        onSelected = function (event, datum, name) {
          $(this).attr('data-form-name', datum.value);
          $(this).attr('data-form-id', datum.id);
        };

        // Event callback for selecting/autocompleting a form
        $(this).on('typeahead:selected', onSelected);
        $(this).on('typeahead:autocompleted', onSelected);

      });
    }
  });
})(jQuery);
