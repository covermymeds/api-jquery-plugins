JavaScript CMM API Consumer
===============

Some jQuery plugins to facilitate working with the CMM API.

Uses Grunt for tasks, Bower for dependency management.

### Installation

[NodeJS](http://nodejs.org/download/) is required to fetch the appropriate project dependencies.

On the command line, type:

```
npm install
./node_modules/bower/bin/bower install
```

### Testing

Load `_SpecRunner.html` in a browser window.

### Distribution

`grunt distribute` will concatenate all the source files and put a compressed
and uncompressed version in the `dist` directory.

### Usage

Using the CoverMyMeds API requires an API key and API secret. [Contact us](mailto:developers@covermymeds.com)
in order to obtain them. For quick testing, enter the key/secret in the `src/config.js`
file, then load the `index.html` file.

While this example file contains an API key/secret in a user-accessible location,
it's recommended to keep those values hidden for the sake of security. The
way to do this is to create a simple "middleman" server-side app which accepts CoverMyMeds API
requests, uses your API key/secret to append a Basic Authentication header, then forwards
the request to CoverMyMeds and returns the response to your front-end application.

-------------------------------

#### Drug Search - $.drugSearch(options)

Create an HTML text input field, and attach the drug search widget:

```
<input type="text" id="drug_search">

<script>
  $(function () {
    $('#drug_search').drugSearch();
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `url` - The URL of an "API middleman" app (see "Usage" above)
* `staging` - If the value is set to `true`, the drug search widget will use `staging.api.covermymeds.com`
instead of `api.covermymeds.com`

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
    $('#form_search').formSearch();
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `url` - The URL of an "API middleman" app (see "Usage" above)
* `staging` - If the value is set to `true`, the drug search widget will use `staging.api.covermymeds.com`
instead of `api.covermymeds.com`
* `state` - The form search requires a two-character state abbreviation. You can either
pass it explicitly when initializing the widget, or else the widget will search for a &lt;select&gt; tag
with a "name" attribute of `request[state]`
* `drugId` - The form search also requires the numeric ID of a drug in the CMM system. You can either
pass it explicitly when initializing the widget, or else the widget will search for an &lt;input&gt; tag
with a "name" attribute of `request[drug_id]`


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
    $('#create_request').createRequest();
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `url` - The URL of an "API middleman" app (see "Usage" above).
* `staging` - If the value is set to `true`, the drug search widget will use `staging.api.covermymeds.com`
instead of `api.covermymeds.com`.
* `data` - an object that contains all necessary data to create a PA request. The object
should conform to the (API documentation)[https://api.covermymeds.com/#part-4]. Alternately, you can create
form fields with name attributes that conform to the documentation, and the widget will automatically find and use
those values.
* `success` - a callback which is executed when the request is successfully created.
* `error` - a callback which is executed when there is an error creating the request. The callback method takes the
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
    $('#dashboard').dashboard({ ids: ['AB1CD2', 'BA3DC4'] });
  });
</script>
```

__Options__

`options` is an object with the following keys:

* `url` - The URL of an "API middleman" app (see "Usage" above).
* `staging` - If the value is set to `true`, the drug search widget will use `staging.api.covermymeds.com`
instead of `api.covermymeds.com`.
* `ids` - an array of IDs that will be displayed by the dashboard.
* `data` - a static object representing the returned results from the CoverMyMeds `/requests/search` API (e.g. `{ "requests": [{ id: 'AB1CD2', ...}, {...}] }`).
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
