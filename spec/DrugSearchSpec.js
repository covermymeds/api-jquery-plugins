/*jslint sloppy: true */
/*global describe: false, it: false, expect: false */

describe('Drug search input field', function () {
    beforeEach(function () {
        $('body').append('<input type="text" id="drug-search">');
        $('#drug-search').drugSearch({
          apiId: '1234567890',
          version: 1
        });
    });

    afterEach(function () {
        var element = $('#drug-search');
        element.drugSearch('destroy');
        element.remove();
    });

    it('suggests drugs based on user input', function () {

        var input = 'nexium';

        runs(function () {
            $('#drug-search').typeahead('setQuery', input).focus();
        });

        waitsFor(function () {
            return $('.tt-suggestion:visible').length > 0;
        }, 'autocomplete to return results', 1000);

        runs(function () {
            $('.tt-suggestion:first').trigger('click');
            expect($('#drug-search').val()).not.toBe(input);
        });
    });
});
