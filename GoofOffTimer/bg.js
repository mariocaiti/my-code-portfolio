//	GoofOff Timer! 
//	for Chrome right now, coming soon to Safari and Firefox. RIP IE ;) 
	/*	refer to sitesList.json	 jLint	*/
$(document).ready(function() {
	$.getJSON(chrome.extension.getURL('sitesList.json'), function (siteData) {	
		$.each(siteData, function (badWebsites, goodWebsites) {
			$('#badSites').append(siteData.badWebsites);
			$('#goodSites').append(siteData.goodWebsites);
			console.log("For the tooltip: " + siteData.badWebsites + " vs. " + siteData.goodWebsites + ".");
		});
	});
});
	/*	to use jSOn in Chrome: 
	Terminal-> open -a Google\ Chrome --args --disable-web-security	*/	
// in FB: .getElementsByClassName to find facebook.com consistently?
//   	"permissions": ["tabs", "http://*.com/*", "https://*.com/*"]		
chrome.tabs.onUpdated.addListener(checkSites);


function checkSites (tabId, changeInfo, tab) {
	console.log("url: " + changeInfo['url']);
	return;
	
	var chkURL = document.createElement('a');
    chkURL.href = document.domain;	//confirmed chkURL.hostname works
    
	$.getJSON(chrome.extension.getURL('sitesList.json'), function (siteData) {	
		$.each(siteData, function (badWebsites, goodWebsites) {
			console.log("for the app: " + siteData.badWebsites + " vs. " + siteData.goodWebsites + ".");
		});
					// add the timer tothe window!
					//	start time check functionality
			
		for(var x=0; x<siteData.badWebsites.length; x++) {
			if (chkURL.hostname==siteData.badWebsites[x].badWebsite) {
																//	testing 1,2,3
				console.log("We are now on the " + siteData.badWebsites[x].badWebsite + " site. The alert should be showing.");
				var nudgeMsg=0;
				var nudgeCount=0;
				var y=Math.floor(Math.random() * siteData.goodWebsites.length);
				var playWarning=[
					"You have just started goofing off. You can still go to a site that doesn't make you stupider, like " + siteData.goodWebsites[y].SiteDesc + ". What do you think?",
					"You have been goofing off for 8 minutes. You can still try and do your work, or read " + siteData.goodWebsites[y].SiteDesc + ". It's good for you!",
					"You have been goofing off for 16 minutes. If you're losing your very important game, and isn't the point of a game to lose? maybe you can try " + siteData.goodWebsites[y].SiteDesc + " and be somebody, baby.",
					"You have been goofing off for 24 minutes. If you've...uh...*relaxed* enough, how about a site that will really get you lucky? Like " + siteData.goodWebsites[y].SiteDesc + "?",
					"You have been goofing off for 32 minutes. Your mother would be so proud. Are you going to " + siteData.goodWebsites[y].SiteDesc + " or will it be a *second*?",
					"You have been goofing off for 40 minutes. I wish I had the kind of free time that you have. Anyway, don't forget to clean your room, do homework and visit " + siteData.goodWebsites[y].SiteDesc + " today.",
					"You have been goofing off for 48 minutes. So, what's so amazing about pictures of pets anyway? If you want to see something amazing, try " + siteData.goodWebsites[y].SiteDesc + ".",
					"You have been goofing off for 56 minutes. Well, you've got stamina, at least. But if you want your dreams to become a reality, maybe you should try " + siteData.goodWebsites[y].SiteDesc + " sooner rather than later." 
				];
				function playcheck_msg () {
					var stayOrGo=confirm(playWarning[nudgeMsg]);
					if(stayOrGo==false) {					//	stay on bad page
						if (nudgeMsg<8) {					//	only warn (currently) 8 times, every 8 minutes
							nudgeMsg+=1;
							nudgeCount+=8;
							console.log("Resume counting to warning #" + nudgeMsg + ".");
							window.setInterval(playcheck_msg, (nudgeCount*60000)+1);
						}										
					} else {									//	go to good page
						clearInterval(playcheck_msg);
						window.location.assign("http://" + siteData.goodWebsites[y].goodWebsite);
						window.reload;
						console.log("Redirection has been accomplished. Well done, have another cookie.");							
					}
				};
				
				playcheck_msg();
				break;
			}
			if (chkURL.hostname==siteData.goodWebsites[x].goodWebsite) {
				alert("Terrific choice.");
				break;
			}
		}		
	}).done(function () {
		console.log( "we found the list. Stop eating so many cookies, fatass." );
	}).fail(function () {
		console.log( "you suck" );
		location.reload(true);
	}).always(function () {
		console.log( "complete" );
	});
}

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
//03-21 19:13:36.119: E/AndroidRuntime(27292): java.lang.RuntimeException: 
//Unable to instantiate activity ComponentInfo{com.example.fastener_v2/com.example.fastener_v2.MainActivity}: 
//java.lang.NullPointerException


