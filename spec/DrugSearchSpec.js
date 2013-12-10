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
        var element = $('#drug-search');

        element.typeahead("setQuery","nexium").focus();
        setTimeout(function () {
            $('.tt-suggestion:first').trigger('click');
            expect(element.val()).toBe('NexIUM 10MG packets');
        }, 1000);
    });
});
