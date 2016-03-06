function saveBadSite() {
		// Get a new site entered, good or bad
	var newBSite = document.getElementById("addSite4Blocking").value;
		// Check that there's some code there.
	if (!newBSite || newBSite==null) {	//neeed better regexp crunching
		message('Error: No site entered.');
		return;
	}
	$.post(chrome.extension.getURL('sitesList.json'), newBSite, function (data, textStatus) {
		// Notify that we saved.
		message('Nice! You have added a site for time monitoring!');
	}, "json");
}
function saveGoodSite() {
		// Get a new site entered, good or bad
	var newGSite = document.getElementById("addQualitySite").value;
		// Check that there's some code there.
	if (!newGSite) {
		message('Error: No site entered.');
		return;
	}
		// Save it using the Chrome extension storage API.
	chrome.storage.local.set({'goodWebsites': newGSite}, function() {
		// Notify that we saved.
		message('You have added a life enriching site!');
	});
}