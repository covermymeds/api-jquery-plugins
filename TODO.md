# TODO

6. Extract api_id/api_secret to config file
1. Add `url` parameters to drugSearch/formSearch/createRequest - allow for a
   custom endpoint which appends the api_id/api_secret to the header
3. If no `url` param is supplied, do Basic Auth with id/secret to the default
   CMM URL
4. Add in Base64 lib for Basic Auth
5. Change form/drug search to have actual IDs stored in a hidden input field,
   the naming of which corresponds to convention so it can be auto found
