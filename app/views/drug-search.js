/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global $: false, module: false, require: false */

var Base64 = require('../vendor/base64.js'),
    $ = require('jquery'),
    select2 = require('select2-browserify'),
    _ = require('underscore');

module.exports = function (options) {
    options = $.extend({}, options);

    return this.each(function () {
        var defaultUrl,
            originalCorsSupport;

        defaultUrl = 'https://' + (options.debug ? 'staging.' : '') + 'api.covermymeds.com/drugs?v=' + options.version;
        defaultUrl = 'https://t1-api.testing.covermymeds.com/drugs?v=' + options.version;

        originalCorsSupport = $.support.cors;
        $.support.cors = true;

        $(this).select2({
            placeholder: 'Begin typing the medication name and select from list',
            minimumInputLength: 4,
            ajax: {
                quietMillis: 250,
                url: options.url || defaultUrl,
                transport: function (xhrOptions) {
                    // Add authorization header if directly querying API;
                    // otherwise we assume our custom URL will handle authorization
                    if (!options.url) {
                        _.extend(xhrOptions, {
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(options.apiId + ':x-no-pass'));
                            }
                        });
                    }

                    xhrOptions.error = function (xhr, status) {
                        alert(status);
                        alert(xhr.statusText);
                    };

                    if (!originalCorsSupport) {
                        _.extend(xhrOptions, {
                            xhr: function () {
                                var iframe,
                                    xhr;

                                iframe = $('iframe.cors')[0].contentWindow;

                                if (iframe.XMLHttpRequest !== undefined) {
                                    alert('creating regular ajax obj')
                                    // xhr = new iframe.XMLHttpRequest();
                                } else {
                                    alert('creating MS XMLHTTP obj!');
                                    // xhr = new iframe.ActiveXObject('Microsoft.XMLHTTP');
                                }

                                return xhr;
                            }
                        });
                    }

                    return _($.ajax(xhrOptions)).tap(function () {
                        $.support.cors = originalCorsSupport;
                    });
                },
                data: function (term, page) {
                    return {
                        q: term
                    };
                },
                results: function (data, page) {
                    var results = [],
                        more,
                        i,
                        j;

                    more = (page * 10) < data.total;

                    for (i = 0, j = data.drugs.length; i < j; i += 1) {
                        results.push({
                            text: data.drugs[i].full_name,
                            id: data.drugs[i].id
                        });
                    }

                    return {
                        results: results,
                        more: more
                    };
                }
            }
        });
    });
};
