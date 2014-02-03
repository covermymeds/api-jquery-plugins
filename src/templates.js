/*jslint sloppy: true, nomen: true, white: true */
/*global window: false, _: false */
(function() {
    window.JST = {};

    window.JST.dashboard = _.template([
        '<div class="row">',
        '<div class="col-md-3">',
            '<form action="#" class="well" method="get" role="form">',
            '<fieldset>',
                '<legend>Search</legend>',
                '<div class="form-group"><input class="form-control" name="patient_first_name" placeholder="First Name" size="30" type="text" value="<%= filters.firstName %>"></div>',
                '<div class="form-group"><input class="form-control" name="patient_last_name" placeholder="Last Name" size="30" type="text" value="<%= filters.lastName %>"></div>',
                '<div class="form-group"><input class="form-control" data-behavior="datepicker" name="patient_date_of_birth" placeholder="Date of Birth" size="30" type="text" value="<%= filters.dob %>"></div>',
                '<div class="form-group"><input class="form-control" name="drug_name" placeholder="Drug" size="30" type="text" value="<%= filters.drug %>"></div>',
                '<div class="form-group"><input class="form-control" name="request_id" placeholder="Key" size="30" type="text" value="<%= filters.key %>"></div>',
                '<div class="form-group">',
                    '<button class="btn btn-primary search" type="submit">Search</button> ',
                    '<button class="btn search clear">Clear</button>',

                '</div>',
              '</fieldset>',
            '</form>',
        '</div>',
        '<div class="col-md-9">',
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
        '<% } %>',
        '</div> <!-- /.span9 -->',
        '</div> <!-- /.row -->'
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
