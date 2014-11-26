/*jslint sloppy: true */
/*global require: false, $: false */

if (!$.support.cors) {
    var xdomain = require("./vendor/xdomain.min").xdomain;

    xdomain.slaves({
        'https://api.covermymeds.com': '/xhr-proxy.html'
    });

    $.support.cors = true;
}

$.fn.extend({
    dashboard: require('./views/dashboard'),
    showHelp: require('./views/help'),
    createRequest: require('./views/create-request'),
    drugSearch: require('./views/drug-search'),
    formSearch: require('./views/form-search')
});
