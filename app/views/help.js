/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global $: false, JST: false, module: false */

var JST = require('../templates/compiled.js')['JST'];

module.exports = function (options) {
    options = $.extend({}, options);

    return this.each(function () {
        var content = JST['templates/help.html']();
        $(this).html(content);
    });
};
