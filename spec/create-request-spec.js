/*jslint sloppy: true */
/*global describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, jasmine: false */
var config = {
    apiId: '1vd9o4427lyi0ccb2uem',
    version: 1
};

describe('"Create Request" button', function () {
    beforeEach(function () {
        jasmine.Ajax.install();

        $('body').append('<button id="create-pa">Create PA</button><div id="success"></div>');
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();

        $('#create-pa, #success').remove();
    });

    it('creates a prior authorization request', function () {
        jasmine.Ajax.stubRequest('https://api.covermymeds.com/requests?v=' + config.version).andReturn({
            status: '201',
            contentType: 'application/json',
            responseText: '{"request": {"ur data": "goez here"}}'
        });

        $('#create-pa').createRequest({
            apiId: config.apiId,
            apiSecret: config.apiSecret,
            version: config.version,
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
            }
        });

        $('#create-pa').trigger('click');

        expect($('#success').text()).toBe('Your request was created.');
    });
});
