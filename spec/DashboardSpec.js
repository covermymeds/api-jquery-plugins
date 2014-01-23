/*jslint sloppy: true */
/*global config: false, describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */

describe('PA Dashboard', function () {
    beforeEach(function () {
        $('body').append('<div id="dashboard"></div>');
    });

    afterEach(function () {
        $('#dashboard').remove();
    });

    it('displays a list of PAs', function () {

        runs(function () {
            $('#dashboard').dashboard({
                apiId: config.apiId,
                apiSecret: config.apiSecret,
                version: 1,
                ids: ['PH3GV7', 'KV9FV2', 'NT2DE7']
            });
        });

        waitsFor(function () {
            return $('table.requests').find('tr').length > 0;
        }, 'dashboard to return results', 9000);

        runs(function () {
            expect($('table.requests').find('tr').length).not.toBe(0);
        });
    });
});
