/*jslint sloppy: true */
/*global describe: false, it: false, expect: false */

describe('"Creat Request" button', function () {
    beforeEach(function () {
        $('body').append('<button id="create-pa">Create PA</button>');
        $('#create-pa').createRequest({
          apiId: '8bxnaotv2f5q7wvxvalj',
          version: 1,
          drug_id: 131079,
          form_id: 'anthem_ppi_quantity_limit_15636',
          state: 'OH',
          first_name: 'Test',
          last_name: 'User',
          date_of_birth: '10/16/1985'
        });
    });

    afterEach(function () {
    });

    it('creates a prior authorization request', function () {

        runs(function () {
            $('#create-pa').trigger('click');
        });

        waitsFor(function () {
            return $('.modal-body').text() === 'Your request was created.';
        }, 'autocomplete to return results', 1000);

        runs(function () {
            expect($('.modal-body').text()).toBe('Your request was created.');
        });
    });
});
