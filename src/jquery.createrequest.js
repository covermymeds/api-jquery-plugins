/*jslint sloppy: true, unparam: true, todo: true */
/*global jQuery: false, CMM_API_CONFIG: false, Base64: false */
(function ($) {
    $.fn.extend({
        createRequest: function (options) {
            options = options || { request: {} };

            // Remove plugins/event handlers
            if (options === 'destroy') {
                return this.each(function () {
                    $(this).off('click');
                });
            }

            return this.each(function () {
                var defaultUrl,
                    headers;

                defaultUrl = 'https://staging.api.covermymeds.com/requests?v=' + CMM_API_CONFIG.version;
                headers = options.url ? {} : { 'Authorization': 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret) };

                // Attach event handler
                $(this).on('click', function (event) {
                    event.preventDefault();

                    $.ajax({
                        url: options.url || defaultUrl,
                        type: 'POST',
                        headers: headers,
                        success: options.success,
                        error: options.error,
                        data: {
                            request: {
                                form_id: options.form_id || $('input[name="request[form_id]"]').data('form-id'),
                                state: options.state || $('select[name="request[state]"]').val(),
                                patient: {
                                    first_name: options.first_name || $('input[name="request[patient][first_name]"]').val(),
                                    last_name: options.last_name || $('input[name="request[patient][last_name]"]').val(),
                                    date_of_birth: options.date_of_birth || $('input[name="request[patient][date_of_birth]"]').val()
                                },
                                prescription: {
                                    drug_id: options.drug_id || $('input[name="request[prescription][drug_id]"]').data('drug-id')
                                }
                            }
                        }
                        // data: {
                        //     "request": {
                        //         "urgent": "false",
                        //         "form_id": options.form_id || $('input[name="request[form_id]"]').data('form-id'),
                        //         "state": options.state || $('select[name="request[state]"]').val(),
                        //         "patient": {
                        //             "first_name": options.first_name || $('input[name="request[patient][first_name]"]').val(),
                        //             "middle_name": "",
                        //             "last_name": options.last_name || $('input[name="request[patient][last_name]"]').val(),
                        //             "date_of_birth": options.date_of_birth || $('input[name="request[patient][date_of_birth]"]').val(),
                        //             "gender": "",
                        //             "email": "",
                        //             "health_plan_name": "",
                        //             "member_id": "",
                        //             "group_id": "",
                        //             "phone_number": "",
                        //             "address": {
                        //                 "street_1": "",
                        //                 "street_2": "",
                        //                 "city": "",
                        //                 "state": "",
                        //                 "zip": ""
                        //             }
                        //         },
                        //         "prescriber": {
                        //             "npi": "",
                        //             "first_name": "",
                        //             "last_name": "",
                        //             "clinic_name": "",
                        //             "address": {
                        //                 "street_1": "",
                        //                 "street_2": "",
                        //                 "city": "",
                        //                 "state": "",
                        //                 "zip": ""
                        //             },
                        //             "fax_number": "",
                        //             "phone_number": ""
                        //         },
                        //         "prescription": {
                        //             "drug_id": options.drug_id || $('input[name="request[prescription][drug_id]"]').data('drug-id'),
                        //             "strength": "",
                        //             "frequency": "",
                        //             "enumerated_fields": "",
                        //             "refills": "",
                        //             "dispense_as_written": "",
                        //             "quantity": "",
                        //             "days_supply": ""
                        //         },
                        //         "pharmacy": {
                        //             "name": "",
                        //             "address": {
                        //                 "street_1": "",
                        //                 "street_2": "",
                        //                 "city": "",
                        //                 "state": "",
                        //                 "zip": ""
                        //             },
                        //             "fax_number": "",
                        //             "phone_number": ""
                        //         },
                        //         "enumerated_fields": {
                        //             "icd9_0": "",
                        //             "icd9_1": "",
                        //             "icd9_2": "",
                        //             "failed_med_0": "",
                        //             "failed_med_1": "",
                        //             "failed_med_2": "",
                        //             "failed_med_3": "",
                        //             "failed_med_4": "",
                        //             "failed_med_5": "",
                        //             "failed_med_6": "",
                        //             "failed_med_7": "",
                        //             "failed_med_8": "",
                        //             "failed_med_9": ""
                        //         }
                        //     }
                        // }
                    });
                });
            });
        }
    });
}(jQuery));
