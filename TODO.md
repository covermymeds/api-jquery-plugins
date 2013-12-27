# TODO

1. Append server error messages to "Create Request" failure modal window
2. Add CSS styles to typeahead results
3. Add CSS styles to dashboard
4. Add pagination to dashboard
5. Show a 'no results' message in form/drug search if there are no results
6. Show a spinner in the form/drug search input field (low priority)
7. Add a 'debug' option to plugins, which point to "staging.api.cmm" instead of "api.cmm"

* Add some sort of status indicator to "createrequest" button
* Tweak select2 ajax delay
* Add thumbnails to dashboard display
* Investigate adding a spinner to dashboard "view" links
* Disable form search until drug ID is available
* Add activity spinner/"loading" text to dashboard div; replaced w/ ajax content
* Copy content from "contact us" on cmm homepage to contact view in example app
* Store patients in localstorage
* Change e-prescribe workflow:
	1. Add drug/prescription to user
	2. After search for drug, have forms for quantity, sig, etc (copy from mobile app)
	3. Add buttons to row: "start", "change drug"
	4. Add "name search" to e-prescribe patient list
	5. Add "pick pharmacy" page?
	6. Add "finish" button to patient drug list; checked drugs get requests created for them
	7. Comprehensive writeup for usage, including custom URL endpoints w/ basic auth, etc.