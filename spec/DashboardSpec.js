/*jslint sloppy: true */
/*global describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */

describe('PA Dashboard', function () {
    beforeEach(function () {
        $('body').append('<div id="dashboard"></div>');
    });

    it('displays a list of PAs', function () {

        runs(function () {
            $('#dashboard').dashboard({
                ids: ['PM4EM4', 'WM9QN7', 'FK9HU3'],
                staging: true
            });
        });

        waitsFor(function () {
            return $('#dashboard').children('.request').length > 0;
        }, 'dashboard to return results', 2000);

        runs(function () {
            expect($('#dashboard').children('.request').length).not.toBe(0);
        });
    });
});
