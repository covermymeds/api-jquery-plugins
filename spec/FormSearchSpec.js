/*jslint sloppy: true */
/*global config: false, describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, runs: false, waitsFor: false, jQuery: false */

var config = {
    apiId: '1vd9o4427lyi0ccb2uem',
    version: 1
};

describe('Form search input field', function () {
    beforeEach(function () {
        $('body').append('<input type="text" id="form-search">');
        $('#form-search').formSearch({
            drugId: 131079,
            state: 'OH',
            apiId: config.apiId,
            apiSecret: config.apiSecret,
            version: 1
        });
    });

    afterEach(function () {
        var element = $('#form-search');
        element.drugSearch('destroy');
        element.remove();
    });

    it('suggests forms based on user input', function () {

        var input = 'bcbs';

        runs(function () {
            var press;
            $('#form-search').select2('open');
            press = jQuery.Event("keypress");
            press.ctrlKey = false;
            press.which = 40;
            $('.select2-input').trigger(press);
        });

        waitsFor(function () {
            return $('.select2-results li').length > 0;
        }, 'autocomplete to return results', 2000);

        runs(function () {
            $('.select2-results li:first').trigger('click');
            expect($('#form-search').val()).not.toBe(input);
        });
    });
});
