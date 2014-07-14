/*jslint sloppy: true */
/*global require: false, module: false */

var $ = require('jquery'),
    template = require('../templates/help.html');

module.exports = function (options) {
    options = $.extend({}, options);

    return this.each(function () {
        var content = template();
        $(this).html(content);
    });
};
