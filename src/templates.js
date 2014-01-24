/*jslint sloppy: true, nomen: true, white: true */
/*global window: false, _: false */
(function() {
    window.JST = {};

    window.JST.dashboard = _.template([
        '<table class="table table-striped requests">',
        '<% _.each(requests, function (request) { %>',
            '<tr>',
                '<td class="form-thumbnail">',
                    '<% if (request.form_id) { %>',
                    '<img src="https://www.covermymeds.com/forms/pdf/thumbs/90/highmark_west_virginia_prescription_drug_medication_6827.jpg">',
                    '<% } else { %>',
                    '<img src="https://www.covermymeds.com/styles_r2/images/pick_the_form.png">',
                    '<% } %>',
                '</td>',
                '<td>',
                    '<h4><%= request.patient.first_name %> <%= request.patient.last_name %> (Key: <%= request.id %>)</h4>',
                    '<dl class="dl-horizontal request-details">',
                        '<dt>Status</dt><dd><span class="label label-info"><%= request.workflow_status %></span></dd>',
                        '<dt>Drug</dt><dd><%= request.prescription.name || "(Missing)" %></dd>',
                        '<dt>Created</dt><dd><%= new Date(Date.parse(request.created_at)).toLocaleDateString() %></dd>',
                        '<dt>Link</dt><dd><a href="<%= request.tokens[0].html_url %>">View on CoverMyMeds.com &rarr;</a></dd>',
                   '</dl>',
                '</td>',
            '</tr>',
        '<% }); %>',
        '</table>',
        '<% if (totalPages > 0) { %>',
            '<ul class="pagination">',
                '<% function insideWindow(page, currentPage) {',
                    'var window = 2;',
                    'return Math.abs(currentPage - page) <= window;',
                '} %>',
                '<% i = 0; %>',
                '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>',
                '<% if (!insideWindow(i + 1, currentPage)) { %>',
                    '<li><a href="#">&hellip;</a></li>',
                '<% } %>',
                '<% for (i = 1; i <= totalPages - 1; i += 1) {',
                    'if (insideWindow(i, currentPage)) { %>',
                        '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>',
                    '<% }',
                '} %>',
                '<% i = totalPages; %>',
                '<% if (!insideWindow(i - 1, currentPage)) { %>',
                    '<li><a href="#">&hellip;</a></li>',
                '<% } %>',
                '<li class="<%= (i === currentPage) ? "active" : "" %>"><a href="<%= i %>"><%= (i + 1) %></a></li>',
            '</ul>',
        '<% } %>'
    ].join(''));

    window.JST.formsearch = _.template([
        '<table class="table">',
            '<tr>',
                '<td><img src="<%= form.thumbnail_url %>"></td>',
                '<td><%= form.text %></td>',
            '</tr>',
        '</table>'
        ].join(''));
}(window));