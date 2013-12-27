/*jslint sloppy: true */
/*global describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false */

describe('Drug search input field', function () {
    beforeEach(function () {
        $('body').append('<input type="text" id="drug-search">');
        $('#drug-search').drugSearch();
    });

    afterEach(function () {
        var element = $('#drug-search');
        element.drugSearch('destroy');
        element.remove();
    });

    it('suggests drugs based on user input', function () {

        var input = 'nexium';

        runs(function () {
            var press;
            $('#drug-search').select2('open');
            press = jQuery.Event("keypress");
            press.ctrlKey = false;
            press.which = 40;
            $('.select2-input').trigger(press);
            //$('#drug-search').focus().val(input);
        });

        waitsFor(function () {
            return $('.select2-results li').length > 0;
        }, 'autocomplete to return results', 2000);

        runs(function () {
            $('.select2-results li:first').trigger('click');
            expect($('#drug-search').val()).not.toBe(input);
        });
    });
});
