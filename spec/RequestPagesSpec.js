/*jslint sloppy: true */
/*global config: false, describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */

describe('Request Pages', function () {
    beforeEach(function () {
        $('body').append('<div id="request-pages"></div>');
    });

    afterEach(function () {
        $('#request-pages').remove();
    });

    it('displays a request page using default options', function () {

        runs(function () {
            $('#request-pages').showRequestPagesForm({
                apiId: config.apiId,
                version: 1,
                requestId: 'PF6FK9',
                tokenId: 'gq9vmqai2mkwewv1y55x'
            });
        });

        waitsFor(function () {
            return $('form.request-pages-form').find('fieldset').length > 0;
        }, 'request-pages to return results', 9000);

        runs(function () {
            expect($('form.request-pages-form').find('fieldset').length).not.toBe(0);
        });
    });

    it('displays a request page using specific URL', function () {

        runs(function () {
            $('#request-pages').showRequestPagesForm({
                url: 'https://api.covermymeds.com/request-pages/PF6FK9?v=1&api_id=1vd9o4427lyi0ccb2uem&token_id=gq9vmqai2mkwewv1y55x'
            });
        });

        waitsFor(function () {
            return $('form.request-pages-form').find('fieldset').length > 0;
        }, 'request-pages to return results', 9000);

        runs(function () {
            expect($('form.request-pages-form').find('fieldset').length).not.toBe(0);
        });
    });



});
