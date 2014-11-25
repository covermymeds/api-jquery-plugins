/*jslint sloppy: true */
/*global require: false */

window.$.fn.extend({
    dashboard: require('./views/dashboard.js'),
    showHelp: require('./views/help.js'),
    createRequest: require('./views/create-request.js'),
    drugSearch: require('./views/drug-search.js'),
    formSearch: require('./views/form-search.js')
});
