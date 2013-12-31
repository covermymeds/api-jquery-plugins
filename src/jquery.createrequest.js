/*jslint sloppy: true, unparam: true, todo: true */
/*global jQuery: false, CMM_API_CONFIG: false, Base64: false */
(function ($) {
    $.fn.extend({
        createRequest: function (options) {
            options = options || {};

            // Remove event handler created by this plugin
            if (options === 'destroy') {
                return this.each(function () {
                    $(this).off('click');
                });
            }

            return this.each(function () {
                var defaultUrl,
                    headers,
                    button,
                    active;

                defaultUrl = 'https://' + (options.staging ? 'staging.' : '') + 'api.covermymeds.com/requests?v=' + CMM_API_CONFIG.version;
                headers = options.url ? {} : { 'Authorization': 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret) };

                button = $(this);
                active = false;

                // Attach event handler
                button.on('click', function (event) {
                    event.preventDefault();

                    // Prevent duplicate/multiple clicks
                    if (active === true) {
                        return;
                    }

                    button.attr('disabled', 'disabled');
                    active = true;

                    // To create a PA request, either pass a "data" attribute in the options object,
                    // or create form elements that conform to the API data naming convention
                    var dataFromFormElements = {
                        "request": {
                            "urgent": $('input[name="request[urgent]"]').attr('checked'),
                            "form_id": $('input[name="request[form_id]"]').val(),
                            "state": $('select[name="request[state]"]').val(),
                            "patient": {
                                "first_name": $('input[name="request[patient][first_name]"]').val(),
                                "middle_name": $('input[name="request[patient][middle_name]"]').val(),
                                "last_name": $('input[name="request[patient][last_name]"]').val(),
                                "date_of_birth": $('input[name="request[patient][date_of_birth]"]').val(),
                                "gender": $('select[name="request[patient][gender]"]').val(),
                                "email": $('input[name="request[patient][email]"]').val(),
                                "health_plan_name": $('input[name="request[patient][health_plan_name]"]').val(),
                                "member_id": $('input[name="request[patient][member_id]"]').val(),
                                "group_id": $('input[name="request[patient][group_id]"]').val(),
                                "phone_number": $('input[name="request[patient][phone_number]"]').val(),
                                "address": {
                                    "street_1": $('input[name="request[patient][address][street_1]"]').val(),
                                    "street_2": $('input[name="request[patient][address][street_2]"]').val(),
                                    "city": $('input[name="request[patient][address][city]"]').val(),
                                    "state": $('select[name="request[patient][address][state]"]').val(),
                                    "zip": $('input[name="request[patient][address][zip]"]').val()
                                }
                            },
                            "prescriber": {
                                "npi": $('input[name="request[prescriber][npi]"]').val(),
                                "first_name": $('input[name="request[prescriber][first_name]"]').val(),
                                "last_name": $('input[name="request[prescriber][last_name]"]').val(),
                                "clinic_name": $('input[name="request[prescriber][clinic_name]"]').val(),
                                "address": {
                                    "street_1": $('input[name="request[prescriber][address][street_1]"]').val(),
                                    "street_2": $('input[name="request[prescriber][address][street_2]"]').val(),
                                    "city": $('input[name="request[prescriber][address][city]"]').val(),
                                    "state": $('select[name="request[prescriber][address][state]"]').val(),
                                    "zip": $('input[name="request[prescriber][address][zip]"]').val()
                                },
                                "fax_number": $('input[name="request[prescriber][fax_number]"]').val(),
                                "phone_number": $('input[name="request[prescriber][phone_number]"]').val()
                            },
                            "prescription": {
                                "drug_id": $('input[name="request[prescription][drug_id]"]').val(),
                                "strength": $('input[name="request[prescription][strength]"]').val(),
                                "frequency": $('input[name="request[prescription][frequency]"]').val(),
                                "enumerated_fields": $('input[name="request[prescription][enumerated_fields]"]').val(),
                                "refills": $('input[name="request[prescription][refills]"]').val(),
                                "dispense_as_written": $('input[name="request[prescription][dispense_as_written]"]').val(),
                                "quantity": $('input[name="request[prescription][quantity]"]').val(),
                                "days_supply": $('input[name="request[prescription][days_supply]"]').val()
                            },
                            "pharmacy": {
                                "name": $('input[name="request[pharmacy][name]"]').val(),
                                "address": {
                                    "street_1": $('input[name="request[pharmacy][address][street_1]"]').val(),
                                    "street_2": $('input[name="request[pharmacy][address][street_2]"]').val(),
                                    "city": $('input[name="request[pharmacy][address][city]"]').val(),
                                    "state": $('select[name="request[pharmacy][address][state]"]').val(),
                                    "zip": $('input[name="request[pharmacy][address][zip]"]').val()
                                },
                                "fax_number": $('input[name="request[pharmacy][fax_number]"]').val(),
                                "phone_number": $('input[name="request[pharmacy][phone_number]"]').val()
                            },
                            "enumerated_fields": {
                                "icd9_0": $('input[name="request[enumerated_fields][icd9_0]"]').val(),
                                "icd9_1": $('input[name="request[enumerated_fields][icd9_1]"]').val(),
                                "icd9_2": $('input[name="request[enumerated_fields][icd9_2]"]').val(),
                                "failed_med_0": $('input[name="request[enumerated_fields][failed_med_0]"]').val(),
                                "failed_med_1": $('input[name="request[enumerated_fields][failed_med_1]"]').val(),
                                "failed_med_2": $('input[name="request[enumerated_fields][failed_med_2]"]').val(),
                                "failed_med_3": $('input[name="request[enumerated_fields][failed_med_3]"]').val(),
                                "failed_med_4": $('input[name="request[enumerated_fields][failed_med_4]"]').val(),
                                "failed_med_5": $('input[name="request[enumerated_fields][failed_med_5]"]').val(),
                                "failed_med_6": $('input[name="request[enumerated_fields][failed_med_6]"]').val(),
                                "failed_med_7": $('input[name="request[enumerated_fields][failed_med_7]"]').val(),
                                "failed_med_8": $('input[name="request[enumerated_fields][failed_med_8]"]').val(),
                                "failed_med_9": $('input[name="request[enumerated_fields][failed_med_9]"]').val()
                            }
                        }
                    };

                    $.ajax({
                        url: options.url || defaultUrl,
                        type: 'POST',
                        headers: headers,
                        success: function (data, status, xhr) {
                            // Re-enable button
                            button.removeAttr('disabled');
                            active = false;

                            // Run user-defined callback
                            if (typeof options.success === 'function') {
                                options.success(data, status, xhr);
                            }
                        },
                        error: function (data, status, xhr) {
                            // Re-enable button
                            button.removeAttr('disabled');
                            active = false;

                            // Run user-defined callback
                            if (typeof options.error === 'function') {
                                options.error(data, status, xhr);
                            }
                        },
                        data: options.data || dataFromFormElements
                    });
                });
            });
        }
    });
}(jQuery));
