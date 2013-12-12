/*jslint sloppy: true, unparam: true, todo: true */
/*global jQuery: false */
(function ($) {
    $.fn.extend({
        createRequest: function (options) {
            options = options || {};

            if (options === 'destroy') {
                return this.each(function () {
                    $(this).off('click');
                });
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
                            "request": {
                                "urgent": "false",
                                "form_id": options.formId || $('input[name="request[form_id]"]').data('form-id'),
                                "state": options.state || $('select[name="request[state]"]').val(),
                                "patient": {
                                    "first_name": $('input[name="request[patient][first_name]"]').val(),
                                    "middle_name": "",
                                    "last_name": $('input[name="request[patient][last_name]"]').val(),
                                    "date_of_birth": $('input[name="request[patient][date_of_birth]"]').val(),
                                    "gender": "",
                                    "email": "",
                                    "health_plan_name": "",
                                    "member_id": "",
                                    "group_id": "",
                                    "phone_number": "",
                                    "address": {
                                        "street_1": "",
                                        "street_2": "",
                                        "city": "",
                                        "state": "",
                                        "zip": ""
                                    }
                                },
                                "prescriber": {
                                    "npi": "",
                                    "first_name": "",
                                    "last_name": "",
                                    "clinic_name": "",
                                    "address": {
                                        "street_1": "",
                                        "street_2": "",
                                        "city": "",
                                        "state": "",
                                        "zip": ""
                                    },
                                    "fax_number": "",
                                    "phone_number": ""
                                },
                                "prescription": {
                                    "drug_id": options.drugId || $('input[name="request[drug_id]"]').data('drug-id'),
                                    "strength": "",
                                    "frequency": "",
                                    "enumerated_fields": "",
                                    "refills": "",
                                    "dispense_as_written": "",
                                    "quantity": "",
                                    "days_supply": ""
                                },
                                "pharmacy": {
                                    "name": "",
                                    "address": {
                                        "street_1": "",
                                        "street_2": "",
                                        "city": "",
                                        "state": "",
                                        "zip": ""
                                    },
                                    "fax_number": "",
                                    "phone_number": ""
                                },
                                "enumerated_fields": {
                                    "icd9_0": "",
                                    "icd9_1": "",
                                    "icd9_2": "",
                                    "failed_med_0": "",
                                    "failed_med_1": "",
                                    "failed_med_2": "",
                                    "failed_med_3": "",
                                    "failed_med_4": "",
                                    "failed_med_5": "",
                                    "failed_med_6": "",
                                    "failed_med_7": "",
                                    "failed_med_8": "",
                                    "failed_med_9": ""
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
}(jQuery));
