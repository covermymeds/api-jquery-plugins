CoverMyMeds API jQuery Plugins
===============

jQuery plugins to facilitate working with the CMM API. Easily search for drugs, PA forms, and
create PA requests.

### Installation

Uses Grunt for tasks, Bower for dependency management.

[NodeJS](http://nodejs.org/download/) is required to fetch the appropriate project dependencies.

In a terminal, type:

```
npm install
./node_modules/bower/bin/bower install
```

### Testing

Load `SpecRunner.html` in a browser window.

### Distribution

In a terminal, `grunt distribute` will concatenate all the source files and put a compressed
and uncompressed version in the `dist` directory. To add to your project, include
the `dist/api-jquery-plugins.js` file, as well as the `src/config.js` and copies of Underscore.js
and jQuery. In total, you will need:

```
underscore.js
api-jquery-plugins.js
config.js
jquery.js
main.css
```

### Usage

The CoverMyMeds API requires an API ID. [Contact us](mailto:developers@covermymeds.com)
in order to obtain them. For quick testing, enter your ID in the `src/config.js`
file, then load the `index.html` file.

The basic workflow to create a new Prior Authorization request:

1. Search for a drug using the `drugSearch` autocomplete plugin
2. Search for a form using the `formSearch` autocomplete plugin
3. Fill in some extra data about the patient (name, birthday, etc.), then submit
the request using the `createRequest` plugin

-------------------------------

#### Drug Search - $.drugSearch(options)

Create an HTML text input field, and attach the drug search widget:

```
<input type="text" id="drug_search">

<script>
  $(function () {
    var options = {
      apiId: '<Your API ID>',
      version: 1
    };
    $('#drug_search').drugSearch(options);
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `apiId` (required) - Your API ID
* `version` (required) - Version of the CoverMyMeds API you want to access
* `url` (optional) - The URL of an "API middleman" app (see "Usage" above)
* `debug` (optional) - If the value is set to `true`, the plugin will use the CoverMyMeds test server
instead of production.

To remove all event listeners created by the plugin, pass the string 'destroy'
instead of an object:

```
$('#drug_search').drugSearch('destroy');
```

-------------------------------

#### Form Search - $.formSearch(options)

Create an HTML text input field, and attach the form search widget:

```
<input type="text" id="form_search">

<script>
  $(function () {
    var options = {
      apiId: '<Your API ID>',
      version: 1,
      drugId: 12345,
      state: 'OH'
    };
    $('#form_search').formSearch(options);
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `apiId` (required) - Your API ID
* `version` (required) - Version of the CoverMyMeds API you want to access
* `drugId` (required) - The form search also requires the numeric ID of a drug in the CMM system. You can either
pass it explicitly when initializing the widget, or else the widget will search for an &lt;input&gt; tag
with a "name" attribute of `request[drug_id]`
* `state` (required) - The form search requires a two-character state abbreviation. You can either
pass it explicitly when initializing the widget, or else the widget will search for a &lt;select&gt; tag
with a "name" attribute of `request[state]`
* `url` (optional) - The URL of an "API middleman" app (see "Usage" above)
* `debug` (optional) - If the value is set to `true`, the plugin will use the CoverMyMeds test server
instead of production.

To remove all event listeners created by the plugin, pass the string 'destroy'
instead of an object:

```
$('#form_search').formSearch('destroy');
```

#### "Create Request" button - $.createRequest(options)

Create an HTML button, and attach the "create request" widget:

```
<button id="create_request">Click me!</button>

<script>
  $(function () {
    var options = {
      apiId: '<Your API ID>',
      version: 1,
      data: {
        request: { ... } 
      }
    };
    $('#create_request').createRequest(options);
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `apiId` (required) - Your API ID
* `version` (required) - Version of the CoverMyMeds API you want to access
* `url` (optional) - The URL of an "API middleman" app (see "Usage" above).
* `debug` (optional) - If the value is set to `true`, the plugin will use the CoverMyMeds test server
instead of production.
* `data` (optional) - an object that contains all necessary data to create a PA request. The object
should conform to the [API documentation](https://api.covermymeds.com/). Alternately, you can create
form fields with name attributes that conform to the documentation, and the widget will automatically find and use
those values.
* `success` (optional) - a callback which is executed when the request is successfully created. In order to
view the request again later, store the `id` of one of the request's tokens and pass it to the `dashboard` plugin.
* `error` (optional) - a callback which is executed when there is an error creating the request. The callback method takes the
following 3 arguments: the data returned from the server, a string describing the request status, and a jQuery `jqXHR` object.

To remove all event listeners created by the plugin, pass the string 'destroy'
instead of an object:

```
$('#create_request').createRequest('destroy');
```

-------------------------------

#### "Show Dashboard" widget - $.dashboard(options)

Given a list of CoverMyMeds request IDs, creates a basic "dashboard," which allows a user to
view high-level request details, and click through to access the request on the CoverMyMeds site.

```
<div id="dashboard"></div>

<script>
  $(function () {
    var options = {
      apiId: '<Your API ID>',
      version: 1,
      tokenIds: ['gq9vmqai2mkwewv1y55x', '33lhqakhtmas8r965w39', 's4c85zi3ku0b9re5sg1o']
    };
    $('#dashboard').dashboard(options);
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `apiId` (required) - Your API ID
* `version` (required) - Version of the CoverMyMeds API you want to access
* `tokenIds` (required) - an array of tokenIds for requests that will be displayed by the dashboard.
* `url` (optional) - The URL of an "API middleman" app (see "Usage" above).
* `debug` (optional) - If the value is set to `true`, the plugin will use the CoverMyMeds test server
instead of production.
* `data` (optional) - a static object representing the returned results from the CoverMyMeds `/requests/search` API (e.g. `{ "requests": [{ id: 'AB1CD2', ...}, {...}] }`).
Use this if you'd like to pre-fetch data and simply use this widget to display it.

-------------------------------

#### "Show Help" widget - $.showHelp()

Show some text to help users get in touch with CoverMyMeds.

```
<div id="help"></div>

<script>
  $(function () {
    $('#help').showHelp();
  });
</script>
```

-------------------------------

#### "Show Request Page" widget - $.requestpages(options)

Given a URL to a request-page, draw it in the given HTML element attached.  Request_Page objects represent the visual display of a given request in a particular state.  

```
<div id="request-pages"
  <p>Loading Prior Authorization form...</p>
</div>

<script>
  $(function() {
    var options = {
      apiId: '<Your API ID>',
      version: 1,
      requestId: 'PF6FK9',
      tokenId: 'gq9vmqai2mkwewv1y55x'
    };
    $('.request-pages').showRequestPagesForm(options);
  });
</script>
```
__Options__

`options` is an object with the following keys:

* `url` - URL that gives back the request-pages JSON for the request you are drawing

If `url` is not specified, the function assumes that you are calling directly against the CoverMyMeds api, and the following are required:

* `requestId` - ID of the request being displayed
* `tokenId` - corresponding authorization token for the request ID
* `apiId` - API ID for your application

