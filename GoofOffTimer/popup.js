function writeCurrentList() {
	if (!window.indexedDB) {
		window.alert("We cannot retrieve your locally saved sites. Sorry about that.");
	} else {var dbc = window.indexedDB.open("siteslist", 4).result;
		var bSiteOStoreS = dbc.transaction(["badwebsites"], "readonly").objectStore("badwebsites");
		var gSiteOStoreS = dbc.transaction(["goodwebsites"], "readonly").objectStore("goodwebsites");
		var bSitesUpdList = bSiteOStoreS.getAll();
		var gSitesUpdList = gSiteOStoreS.getAll();
		var bsr = [];
		var gsr = [];
		chrome.runtime.onMessage.addListener(function () {
			console.log("chrome.runtime.onMessage.addListener is a go.");
			var bgp = chrome.runtime.getBackgroundPage(function (e) {
				console.log("Document we're on now contains:"+e);
			});
	
			bgp.getElementById("gsl").innerHTML = "<ul>";			//is not finding the mamager window!
			bgp.getElementById("bsl").innerHTML = "<ul>";
	
			bSiteOStoreS.onsuccess = function(e) {
				for(var b in bSitesUpdList.result) {
					bgp.getElementById("bsl").innerHTML += "<li><a href=\"http:\\"+b+"\">"+b+"</a></li>";
					bsr.push(b);
				}
			};
			gSiteOStoreS.onsuccess = function(e) {
				for(var g in gSitesUpdList.result) {
					bgp.getElementById("gsl").innerHTML += "<li><a href=\"http:\\"+g[0]+"\">"+g[1]+"</a></li>";
					gsr.push(g);
				}
			};
			bgp.getElementById("gsl").innerHTML += "</ul>";
			bgp.getElementById("bsl").innerHTML += "</ul>";
		});
		startTimer(bsr, gsr);
	}
}
function startTimer(bd, gd) { 
	var chkURL = document.createElement('a');
	chkURL.href = document.domain;	//confirmed chkURL.hostname works, use that! need location.hash for sites like FB to work ???
	var currentSite = chkURL.hostname;
	var cleanCurrSite = currentSite.replace(/www./i, "");
	for(var b in bd) {				//			for(var x=0; x<siteData.badWebsites.length; x++) {
		console.log("Now testing this site against " + b + ". ");
		if (cleanCurrSite == b) {
			console.log("We are now on the " + b + " site. The alert should be showing.");
			var nudgeMsg=0;
			var nudgeCount=0;
			var y=Math.floor(Math.random() * gd.length);
			var playWarning=[
				"You have just started goofing off. You can still go to a site that doesn't make you stupider, like " + gd[y][1] + ". What do you think?",
				"You have been goofing off for 8 minutes. You can still try and do your work, or read " + gd[y][1] + ". It's good for you!",
				"You have been goofing off for 16 minutes. If you're losing your very important game, and isn't the point of a game to lose? maybe you can try " + gd[y][1] + " and be somebody, baby.",
				"You have been goofing off for 24 minutes. If you've...uh...*relaxed* enough, how about a site that will really get you lucky? Like " + gd[y][1] + "?",
				"You have been goofing off for 32 minutes. Your mother would be so proud. Are you going to " + gd[y][1] + " or will it be a *second*?",
				"You have been goofing off for 40 minutes. I wish I had the kind of free time that you have. Anyway, don't forget to clean your room, do homework and visit " + gd[y][1] + " today.",
				"You have been goofing off for 48 minutes. So, what's so amazing about pictures of pets anyway? If you want to see something amazing, try " + gd[y][1] + ".",
				"You have been goofing off for 56 minutes. Well, you've got stamina, at least. But if you want your dreams to become a reality, maybe you should try " + gd[y][1] + " sooner rather than later." 
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
					window.location.assign("http://" + gd[y][0]);
					window.reload;
					console.log("Redirection has been accomplished. Well done, have another cookie.");							
				}
			};

			playcheck_msg();
			break;
		}
	}	
	for(var g in gd) { {
		console.log("Now checking the site for "+g[0]);
		if (cleanCurrSite==g[0]) {
			console.log("Should send up a positive message here.");
			alert("Terrific choice.");
			break;
		}
	}
}
}