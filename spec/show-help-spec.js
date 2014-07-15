/*jslint sloppy: true */
/*global describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */

describe('CMM Help', function () {
    beforeEach(function () {
        $('body').append('<div id="help"></div>');
    });

    afterEach(function () {
        $('#help').remove();
    });

    it('displays some help text', function () {
        $('#help').showHelp();
        expect($('#help').text()).not.toBe('');
    });
});

