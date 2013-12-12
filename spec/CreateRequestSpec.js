/*jslint sloppy: true */
/*global describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */

describe('"Create Request" button', function () {
    beforeEach(function () {
        $('body').append('<button id="create-pa">Create PA</button>');
        $('#create-pa').createRequest({
            drug_id: 131079,
            form_id: 'anthem_ppi_quantity_limit_15636',
            state: 'OH',
            first_name: 'Test',
            last_name: 'User',
            date_of_birth: '10/16/1985'
        });
    });

    it('creates a prior authorization request', function () {
        runs(function () {
            $('#create-pa').trigger('click');
        });

        waitsFor(function () {
            return $('.modal-body').text() === 'Your request was created.';
        }, 'request to be created', 5000);

        runs(function () {
            expect($('.modal-body').text()).toBe('Your request was created.');
        });
    });
});
