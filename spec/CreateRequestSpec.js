/*jslint sloppy: true */
/*global describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */

describe('"Create Request" button', function () {
    beforeEach(function () {
        $('body').append('<button id="create-pa">Create PA</button><div class="success"></div>');
        $('#create-pa').createRequest({
            staging: true,
            data: {
                request: {
                    form_id: 'anthem_ppi_quantity_limit_15636',
                    state: 'OH',
                    prescription: {
                        drug_id: 131079
                    },
                    patient: {
                        first_name: 'Test',
                        last_name: 'User',
                        date_of_birth: '10/16/1985'
                    }
                }
            },
            success: function () {
                $('.success').text('Your request was created.');
            }
        });
    });

    it('creates a prior authorization request', function () {
        runs(function () {
            $('#create-pa').trigger('click');
        });

        waitsFor(function () {
            return $('.success').text() === 'Your request was created.';
        }, 'request to be created', 9000);

        runs(function () {
            expect($('.success').text()).toBe('Your request was created.');
        });
    });
});
