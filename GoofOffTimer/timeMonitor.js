function startTimer() { 
	var chkURL = document.createElement('a');
	chkURL.href = document.domain;	//confirmed chkURL.hostname works, use that! need location.hash for sites like FB to work ???
	var currentSite = chkURL.hostname;
	var cleanCurrSite = currentSite.replace(/www./i, "");
	console.log("startTimer() has been called.\n\n chkURL.hostname is "+chkURL.hostname+"\nCleaning the URL to read "+cleanCurrSite);	
	
	$.getJSON(chrome.extension.getURL('sitesList.json'), function (siteData) {	
		for(var x=0; x<siteData.badWebsites.length; x++) {
			console.log("Now testing this site against " + siteData.badWebsites[x].badWebsite + ". ");
			if (cleanCurrSite==siteData.badWebsites[x].badWebsite) {
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
		}	
		for(var y=0; y<siteData.goodWebsites.length; y++) {
			console.log("Now checking the site for "+siteData.goodWebsites[y].goodWebsite);
			if (cleanCurrSite==siteData.goodWebsites[y].goodWebsite) {
				console.log("Should send up a positive message here.");
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
		console.log( "complete" );	//works!
	});
}