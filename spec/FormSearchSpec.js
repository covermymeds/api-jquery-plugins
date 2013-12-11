/*jslint sloppy: true */
/*global describe: false, it: false, expect: false */

describe('Form search input field', function () {
    beforeEach(function () {
        $('body').append('<input type="text" id="form-search">');
        $('#form-search').formSearch({
          apiId: '1234567890',
          version: 1,
          drug_id: 131079,
          state: 'OH'
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
            $('#form-search').typeahead('setQuery', input).focus();
        });

        waitsFor(function () {
            return $('.tt-suggestion:visible').length > 0;
        }, 'autocomplete to return results', 1000);

        runs(function () {
            $('.tt-suggestion:first').trigger('click');
            expect($('#form-search').val()).not.toBe(input);
        });
    });
});
