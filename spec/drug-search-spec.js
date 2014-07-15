/*jslint sloppy: true */
/*global describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, jasmine: false */

var config = {
    apiId: '1vd9o4427lyi0ccb2uem',
    version: 1
};

describe('Drug search input field', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
        $('body').append('<input type="text" id="drug-search">');
        $('#drug-search').drugSearch({
            apiId: config.apiId,
            version: 1
        });
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
        $('#drug-search').remove();
        $('#drug-search').select2('destroy');
    });

    it('suggests drugs based on user input', function () {
        var input = 'nexium',
            press = $.Event("keypress");

        press.ctrlKey = false;
        press.which = 40;

        jasmine.Ajax.stubRequest('https://api.covermymeds.com/drugs?v=' + config.version + '&q=' + input).andReturn({
            status: '201',
            contentType: 'application/json',
            responseText: '{"drugs":[{"id":"131079","gpi":"49270025103010","sort_group":null,"sort_order":null,"name":"NexIUM","route_of_administration":"OR","dosage_form":"PACK","strength":"10","strength_unit_of_measure":"MG","full_name":"NexIUM 10MG packets","href":"https://api.covermymeds.com/drugs/131079"},{"id":"175285","gpi":"49270025103004","sort_group":null,"sort_order":null,"name":"NexIUM","route_of_administration":"OR","dosage_form":"PACK","strength":"2.5","strength_unit_of_measure":"MG","full_name":"NexIUM 2.5MG packets","href":"https://api.covermymeds.com/drugs/175285"},{"id":"070045","gpi":"49270025106520","sort_group":null,"sort_order":null,"name":"NexIUM","route_of_administration":"OR","dosage_form":"CPDR","strength":"20","strength_unit_of_measure":"MG","full_name":"NexIUM 20MG dr capsules","href":"https://api.covermymeds.com/drugs/070045"},{"id":"125393","gpi":"49270025103020","sort_group":null,"sort_order":null,"name":"NexIUM","route_of_administration":"OR","dosage_form":"PACK","strength":"20","strength_unit_of_measure":"MG","full_name":"NexIUM 20MG packets","href":"https://api.covermymeds.com/drugs/125393"},{"id":"070046","gpi":"49270025106540","sort_group":null,"sort_order":null,"name":"NexIUM","route_of_administration":"OR","dosage_form":"CPDR","strength":"40","strength_unit_of_measure":"MG","full_name":"NexIUM 40MG dr capsules","href":"https://api.covermymeds.com/drugs/070046"},{"id":"125394","gpi":"49270025103040","sort_group":null,"sort_order":null,"name":"NexIUM","route_of_administration":"OR","dosage_form":"PACK","strength":"40","strength_unit_of_measure":"MG","full_name":"NexIUM 40MG packets","href":"https://api.covermymeds.com/drugs/125394"},{"id":"175286","gpi":"49270025103007","sort_group":null,"sort_order":null,"name":"NexIUM","route_of_administration":"OR","dosage_form":"PACK","strength":"5","strength_unit_of_measure":"MG","full_name":"NexIUM 5MG packets","href":"https://api.covermymeds.com/drugs/175286"},{"id":"093873","gpi":"49270025202120","sort_group":null,"sort_order":null,"name":"NexIUM I.V.","route_of_administration":"IV","dosage_form":"SOLR","strength":"20","strength_unit_of_measure":"MG","full_name":"NexIUM I.V. 20MG solutions","href":"https://api.covermymeds.com/drugs/093873"},{"id":"093874","gpi":"49270025202140","sort_group":null,"sort_order":null,"name":"NexIUM I.V.","route_of_administration":"IV","dosage_form":"SOLR","strength":"40","strength_unit_of_measure":"MG","full_name":"NexIUM I.V. 40MG solutions","href":"https://api.covermymeds.com/drugs/093874"}]}'
        });

        $('#drug-search').select2('open');
        $('.select2-input').trigger(press);
        $('.select2-results li:first').trigger('click');

        expect($('#drug-search').val()).not.toBe(input);
    });
});
