/*jslint sloppy: true */
/*global config: false, describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */
var config = {
    apiId: '1vd9o4427lyi0ccb2uem',
    version: 1
};

describe('"Create Request" button', function () {
    beforeEach(function (done) {
        $('body').append('<button id="create-pa">Create PA</button><div id="success"></div>');

        $('#create-pa').createRequest({
            apiId: config.apiId,
            apiSecret: config.apiSecret,
            version: 1,
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
                $('#success').text('Your request was created.');
                done();
            }
        });

        $('#create-pa').trigger('click');
    });

    afterEach(function () {
        $('#create-pa, #success').remove();
    });

    it('creates a prior authorization request', function (done) {
        expect($('#success').text()).toBe('Your request was created.');
        done();
    });
});
