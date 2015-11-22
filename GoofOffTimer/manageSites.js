/*	refer to sitesList.json	 jLint	*/

window.onload = function() {
	var writeGdSites = [];
	var writeBadSites = [];
	$.getJSON(chrome.extension.getURL('sitesList.json'), function (siteData) {		
		
		$.each(siteData, function(key, sites) {
			$.each(sites, function(key, site) {
				if(site.goodWebsite)
					writeGdSites.push(site.goodWebsite);
			});
		});
	
		$.each(siteData, function(key, sites) {
			$.each(sites, function(key, site) {
				if(site.badWebsite)
					writeBadSites.push(site.badWebsite);
			});
		});
		var siteListContainer = [writeGdSites, writeBadSites];
		chrome.runtime.sendMessage(siteListContainer, function(resp) {
			console.log("Sending the info\n\t"+siteListContainer+"\nto the background script.");
			(resp) 
				? console.log("\tAnd it worked because we have a "+resp)
				: console.log("But there was no response!");
		});
	});
};

function saveBadSite() {
		// Get a new site entered, good or bad
	var newBSite = addSite4Blocking.value;
		// Check that there's some code there.
	if (!newBSite) {
		message('Error: No site entered.');
		return;
	}
		// Save it using the Chrome extension storage API. NEEDS TO USE JSON
	chrome.storage.local.set({'badWebsites': newBSite}, function() {
		// Notify that we saved.
		message('You have added a site for time monitoring!');
	});
}
function saveGoodSite() {
		// Get a new site entered, good or bad
	var newGSite = addQualitySite.value;
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