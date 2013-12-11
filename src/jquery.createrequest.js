(function ($) {
  $.fn.extend({
    createRequest: function (options) {
      if (options === 'destroy') {
        return this.each(function () {
        });
      } else if (options === undefined || options.apiId === undefined || options.version === undefined) {
        alert('Missing API ID or Version number');
        return;
      }

      var html = [
        '<div class="modal fade">',
        '<div class="modal-dialog">',
        '<div class="modal-content">',
        '<div class="modal-header">',
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
        '<h4 class="modal-title">Modal title</h4>',
        '</div>',
        '<div class="modal-body">',
        '<p>One fine body&hellip;</p>',
        '</div>',
        '<div class="modal-footer">',
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
        '<button type="button" class="btn btn-primary">Save changes</button>',
        '</div>',
        '</div><!-- /.modal-content -->',
        '</div><!-- /.modal-dialog -->',
        '</div><!-- /.modal -->'
      ];

      // Append Bootstrap modal HTML to the DOM
      $('body').append(html.join("\n"));

      return this.each(function () {
          // Attach event handler
          $(this).on('click', function (event) {
              event.preventDefault();
              $.ajax({
                url: "https://staging.api.covermymeds.com/requests?api_id=" + options.apiId + "&v=" + options.version,
                type: 'POST',
                data: {
                  request: {
                    form_id: options.form_id || $('input[name="request[form_id]"]').data('form-id'),
                    drug_id: options.drug_id || $('input[name="request[drug_id]"]').data('drug-id'),
                    state: options.state || $('select[name="request[state]"]').val(),
                    patient: {
                      first_name: $('input[name="request[patient][first_name]"]').val(),
                      last_name: $('input[name="request[patient][last_name]"]').val(),
                      date_of_birth: $('input[name="request[patient][date_of_birth]"]').val()
                    }
                  } 
                },
                success: function (data, status, xhr) {
                  $('.modal-body').text('Your request was created.');
                  $('.modal').modal();
                },
                error: function (data, status, xhr) {
                  $('.modal-body').text('There was an error processing your request.');
                  $('.modal').modal();
                }
              });
          });
      });
    }
  });
})(jQuery);
