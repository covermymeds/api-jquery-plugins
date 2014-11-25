/*jslint sloppy: true */
/*global config: false, describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, jasmine: false */

var config = {
    apiId: '1vd9o4427lyi0ccb2uem',
    version: 1
};

describe('Form search input field', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
        $('body').append('<input type="text" id="form-search">');
        $('#form-search').formSearch({
            drugId: 131079,
            state: 'OH',
            apiId: config.apiId,
            version: config.version
        });
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
        $('#form-search').remove();
        $('#form-search').select2('destroy');
    });

    it('suggests forms based on user input', function () {
        var input = 'bcbs',
            press = $.Event("keypress");

        press.ctrlKey = false;
        press.which = 40;

        jasmine.Ajax.stubRequest('https://api.covermymeds.com/forms?v=' + config.version + '&q=' + input + '&state=OH&drug_id=131079').andReturn({
            status: '201',
            contentType: 'application/json',
            responseText: '{"forms":[{"id":15636,"href":"https://api.covermymeds.com/forms/15636","name":"anthem_ppi_quantity_limit","description":"Anthem Blue Cross Blue Shield Proton Pump Inhibitors Quantity Limit Form","directions":"Quantity Limit Form for Proton Pump Inhibitors","request_form_id":"anthem_ppi_quantity_limit_15636","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/anthem_ppi_quantity_limit_15636.jpg","score":7325},{"id":6827,"href":"https://api.covermymeds.com/forms/6827","name":"highmark_west_virginia_prescription_drug_medication","description":"Highmark Blue Cross Blue Shield West Virginia Prescription Drug Medication Request Form","directions":"Highmark Blue Cross Blue Shield West Virginia Prior Authorization Form for Prescription Drug Medication Requests. This can also be used for Ohio plan members. ","request_form_id":"highmark_west_virginia_prescription_drug_medication_6827","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/highmark_west_virginia_prescription_drug_medication_6827.jpg","score":6240},{"id":15257,"href":"https://api.covermymeds.com/forms/15257","name":"blue_cross_blue_shield_georgia_general","description":"Anthem Blue Cross Blue Shield Non-Preferred Medications Request Form","directions":"Anthem Prior Authorization Form for Non-Preferred Medications Request ","request_form_id":"blue_cross_blue_shield_georgia_general_15257","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/blue_cross_blue_shield_georgia_general_15257.jpg","score":5325},{"id":15158,"href":"https://api.covermymeds.com/forms/15158","name":"express_scripts_medicare_part_d_quantity_limit_exceptions","description":"Anthem Blue Cross Blue Shield Medicare Part D Quantity Limit Exceptions Form","directions":"Medicare Part D Prior Authorization Form for Quantity Limit Exceptions","request_form_id":"express_scripts_medicare_part_d_quantity_limit_exceptions_15158","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/express_scripts_medicare_part_d_quantity_limit_exceptions_15158.jpg","score":5325},{"id":15570,"href":"https://api.covermymeds.com/forms/15570","name":"anthem_multisource_brand_medications","description":"Anthem Blue Cross Blue Shield Multi-Source Brand Medications Form","directions":"Prior Authorization of Benefits (PAB) Form for Brand Medications that have Available Generic Equivalents","request_form_id":"anthem_multisource_brand_medications_15570","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/anthem_multisource_brand_medications_15570.jpg","score":5325},{"id":15582,"href":"https://api.covermymeds.com/forms/15582","name":"anthem_quantity_supply","description":"Anthem Blue Cross Blue Shield Quantity Supply Form","directions":"Anthem Blue Cross Blue Shield Prior Authorization of Benefits (PAB) Form for Quantity Supply","request_form_id":"anthem_quantity_supply_15582","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/anthem_quantity_supply_15582.jpg","score":5325},{"id":3876,"href":"https://api.covermymeds.com/forms/3876","name":"anthem_general","description":"Anthem Drug Health Services Review Form","directions":"Use this form for drugs requiring health services review and requests exceeding plan limitations (i.e. Traveling out of the country).  Do not use this form for Synagis Requests.","request_form_id":"anthem_general_3876","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/anthem_general_3876.jpg","score":3245},{"id":25286,"href":"https://api.covermymeds.com/forms/25286","name":"highmark_blue_shield_general","description":"Highmark Blue Shield General Form","directions":"Prescription Drug Medication Requests","request_form_id":"highmark_blue_shield_general_25286","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/highmark_blue_shield_general_25286.jpg","score":2700},{"id":21182,"href":"https://api.covermymeds.com/forms/21182","name":"anthemohabd_ppi_maintenance_therapy","description":"Anthem Ohio Proton Pump Inhibitors (Maintenance Therapy) Prior Authorization of Benefits (PAB) Form","directions":"Prior Authorization of Benefits (PAB) for Proton Pump Inhibitors Maintenance Therapy ","request_form_id":"anthemohabd_ppi_maintenance_therapy_21182","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/anthemohabd_ppi_maintenance_therapy_21182.jpg","score":1620},{"id":21199,"href":"https://api.covermymeds.com/forms/21199","name":"anthemohabd_ppi_initiation","description":"Anthem Ohio Non-Preferred Proton Pump Inhibitors (Initiation of Therapy) Form","directions":"Non-Preferred Proton Pump Inhibitors (Initiation of Therapy) Prior Authorization of Benefits (PAB) Form","request_form_id":"anthemohabd_ppi_initiation_21199","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/anthemohabd_ppi_initiation_21199.jpg","score":1620},{"id":21128,"href":"https://api.covermymeds.com/forms/21128","name":"anthemohabd_medication_request_form","description":"Anthem Ohio ABD Plan General Form","directions":"Prior Authorization of Benefits Form for Prescription Medications","request_form_id":"anthemohabd_medication_request_form_21128","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/anthemohabd_medication_request_form_21128.jpg","score":1120},{"id":20161,"href":"https://api.covermymeds.com/forms/20161","name":"meijer_pharmacy_diabetic_testing_supplies_form","description":"Meijer Pharmacy Diabetic Testing Supplies Form","directions":"Medical Necessity Form for Diabetic Testing Supplies","request_form_id":"meijer_pharmacy_diabetic_testing_supplies_form_20161","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/meijer_pharmacy_diabetic_testing_supplies_form_20161.jpg","score":580},{"id":16257,"href":"https://api.covermymeds.com/forms/16257","name":"formbuilder","description":"Caremark Electronic PA Form","directions":"Caremark Prior Authorizations","request_form_id":"formbuilder_16257","thumbnail_url":"https://www.covermymeds.com/forms/pdf/thumbs/90/formbuilder_16257.jpg","score":400}]}'
        });

        $('#form-search').select2('open');
        $('.select2-input').trigger(press);
        $('.select2-results li:first').trigger('click');
        expect($('#form-search').val()).not.toBe(input);
    });
});
