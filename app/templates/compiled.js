this["JST"] = this["JST"] || {};

this["JST"]["app/templates/dashboard-content.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<table class="table table-striped requests">\n    ';
 if (requests.length === 0) { ;
__p += '\n    <tr>\n        <td><h4>No Results</h4></td>\n    </tr>\n    ';
 } ;
__p += '\n\n    ';
 _(requests).each(function (request) { ;
__p += '\n    <tr>\n        <td class="form-thumbnail">\n            <a href="' +
((__t = ( request.tokens[0].html_url )) == null ? '' : __t) +
'" target="_blank">\n            ';
 if (request.form_id) { ;
__p += '\n            <img src="https://www.covermymeds.com/forms/pdf/thumbs/90/highmark_west_virginia_prescription_drug_medication_6827.jpg">\n            ';
 } else { ;
__p += '\n            <img src="https://www.covermymeds.com/styles_r2/images/pick_the_form.png">\n            ';
 } ;
__p += '\n            </a>\n        </td>\n        <td>\n            <h4>' +
((__t = ( request.patient.first_name )) == null ? '' : __t) +
' ' +
((__t = ( request.patient.last_name )) == null ? '' : __t) +
' (Key: ' +
((__t = ( request.id )) == null ? '' : __t) +
')</h4>\n            <dl class="dl-horizontal request-details">\n                <dt>Status</dt><dd><span class="label label-info">' +
((__t = ( request.workflow_status )) == null ? '' : __t) +
'</span></dd>\n                <dt>Drug</dt><dd>' +
((__t = ( request.prescription.name || "(Missing)" )) == null ? '' : __t) +
'</dd>\n                <dt>Created</dt><dd>' +
((__t = ( new Date(Date.parse(request.created_at)).toLocaleDateString() )) == null ? '' : __t) +
' ';
 if (request.memo) { ;
__p +=
((__t = ( request.memo )) == null ? '' : __t);
 } ;
__p += '</dd>\n                <dt></dt><dd><a href="' +
((__t = ( request.tokens[0].html_url )) == null ? '' : __t) +
'" target="_blank">' +
((__t = ( window.NEWCROP ? "Complete" : "View" )) == null ? '' : __t) +
' this request &rarr;</a></dd>\n           </dl>\n        </td>\n    </tr>\n    ';
 }); ;
__p += '\n</table>\n\n';
 if (totalPages > 0) { ;
__p += '\n    <ul class="pagination">\n        ';
 function insideWindow(page, currentPage) {
            var window = 2;
            return Math.abs(currentPage - page) <= window;
        } ;
__p += '\n        ';
 i = 0; ;
__p += '\n        <li class="' +
((__t = ( (i === currentPage) ? "active" : "" )) == null ? '' : __t) +
'"><a href="' +
((__t = ( i )) == null ? '' : __t) +
'">' +
((__t = ( (i + 1) )) == null ? '' : __t) +
'</a></li>\n        ';
 if (!insideWindow(i + 1, currentPage)) { ;
__p += '\n            <li><a href="#">&hellip;</a></li>\n        ';
 } ;
__p += '\n        ';
 for (i = 1; i <= totalPages - 1; i += 1) {
            if (insideWindow(i, currentPage)) { ;
__p += '\n                <li class="' +
((__t = ( (i === currentPage) ? "active" : "" )) == null ? '' : __t) +
'"><a href="' +
((__t = ( i )) == null ? '' : __t) +
'">' +
((__t = ( (i + 1) )) == null ? '' : __t) +
'</a></li>\n            ';
 }
        } ;
__p += '\n        ';
 i = totalPages; ;
__p += '\n        ';
 if (!insideWindow(i - 1, currentPage)) { ;
__p += '\n            <li><a href="#">&hellip;</a></li>\n        ';
 } ;
__p += '\n        <li class="' +
((__t = ( (i === currentPage) ? "active" : "" )) == null ? '' : __t) +
'"><a href="' +
((__t = ( i )) == null ? '' : __t) +
'">' +
((__t = ( (i + 1) )) == null ? '' : __t) +
'</a></li>\n    </ul>\n';
 } ;


}
return __p
};

this["JST"]["app/templates/dashboard.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\n    <div class="navigation col-md-3">\n        <div class="order btn-group btn-group-justified">\n            <div class="btn-group"><button type="button" data-direction="desc" class="btn btn-default active">Newest First</button></div>\n            <div class="btn-group"><button type="button" data-direction="asc" class="btn btn-default">Oldest First</button></div>\n        </div>\n        <hr>\n        <ul class="folders nav nav-pills nav-stacked">\n            ';
 _(folders).each(function (folder, name) { ;
__p += '\n            <li class="' +
((__t = ( name === currentFolder ? "active" : "" )) == null ? '' : __t) +
'"><a href="#' +
((__t = ( name )) == null ? '' : __t) +
'"><span class="glyphicon glyphicon-folder-close"></span> ' +
((__t = ( name )) == null ? '' : __t) +
' <span class="badge pull-right">' +
((__t = ( folder.data.length )) == null ? '' : __t) +
'</span></a></li>\n            ';
 }); ;
__p += '\n        </ul>\n        <hr>\n        <form action="#" class="well" method="get" role="form">\n        <fieldset>\n            <legend>Search</legend>\n            <div class="input-group">\n                <input class="form-control search" name="q" placeholder="Search" type="search">\n                <span class="input-group-btn">\n                    <button class="clear btn btn-default" type="button"><span class="clear glyphicon glyphicon-remove"></span></button>\n                </span>\n            </div>\n          </fieldset>\n        </form>\n    </div>\n    <div class="content col-md-9">\n    </div> <!-- /.content -->\n</div> <!-- /.row -->\'';

}
return __p
};

this["JST"]["app/templates/form-search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<table class="table">\n    <tr>\n        <td><img src="' +
((__t = ( form.thumbnail_url )) == null ? '' : __t) +
'"></td>\n        <td>' +
((__t = ( form.text )) == null ? '' : __t) +
'</td>\n    </tr>\n</table>';

}
return __p
};

this["JST"]["app/templates/help.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>For assistance using CoverMyMeds&reg;</h1>\n<ul>\n      <li>Phone: 1-866-452-5017</li>\n      <li>Email: <a href="mailto:help@covermymeds.com">help@covermymeds.com</a></li>\n</ul>\n\n<h1>Send forms or report data issues</h1>\n<ul>\n      <li>Phone: 1-866-452-5017</li>\n      <li>Fax: 1-615-379-2541</li>\n      <li>Email: <a href="mailto:data@covermymeds.com">data@covermymeds.com</a></li>\n</ul>';

}
return __p
};