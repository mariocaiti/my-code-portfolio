//	GoofOff Timer! 
//	for Chrome right now, coming soon to Safari and Firefox. RIP IE ;) 



if (!window.indexedDB) {
	window.alert("We are working on storing your sites list locally but something went wrong. Sorry about that.");
} else {
	var openR = window.indexedDB.open("siteslist", 4);	//must be at 4 and no camelcase to work
	var dbc;
	
	openR.onupgradeneeded = function(e) {
		try {
			dbc = e.target.result;
			var bSiteOStoreC = dbc.createObjectStore("badwebsites", { keyPath : 'id', autoIncrement : true });
				bSiteOStoreC.createIndex("badwebsite", "badwebsite", {unique: true});	//optional??
			var gSiteOStoreC = dbc.createObjectStore("goodwebsites", {autoIncrement : true });
				gSiteOStoreC.createIndex("goodwebsite", "goodwebsite", {unique: true});
				gSiteOStoreC.createIndex("sitedesc", "sitedesc");	
		} catch (e) {
			console.log("An index creation failed: "+e);
		}
	};
	openR.onsuccess = function(e) {
		dbc = e.target.result;
		console.log("Indexes for both DBs created!\nWriting initial records:");	
		makeBaseLists();														//we pop from the json starter list, can add later
	};
	openR.onblocked = function(e) {
		console.log("Blocked! -> "+e);
	};
	openR.onerror = function(e) {
		console.log("Error: "+e);
	};
	function makeBaseLists() {	
		$.getJSON(chrome.extension.getURL('sitesList.json'), function (siteData) {
			var bSiteOStoreRW = dbc.transaction(["badwebsites"], "readwrite").objectStore("badwebsites");	//Uncaught InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase': A version change transaction is running
			var gSiteOStoreRW = dbc.transaction(["goodwebsites"], "readwrite").objectStore("goodwebsites");
		
			for(var x in siteData.badWebsites) {
				try {
					console.log("bad website: "+siteData.badWebsites[x].badWebsite+". Trying to add...");
					bSiteOStoreRW.add({badwebsite: siteData.badWebsites[x].badWebsite});
				} catch (e) {
					console.log("Error writing to badWebsites: ", e);			
				}
			}
			for(var y in siteData.goodWebsites) {
				try {	
					console.log("good website: "+siteData.goodWebsites[y].goodWebsite+" or "+siteData.goodWebsites[y].SiteDesc+". Trying to add...");
					gSiteOStoreRW.add({goodwebsite: siteData.goodWebsites[y].goodWebsite, sitedesc: siteData.goodWebsites[y].SiteDesc});
				} catch (e) {
					console.log("Error writing to goodWebsites: ", e);			
				}
			}	
			console.log("makeBaseLists() is done.");
			writeCurrentList();	//in popup.js
		})
		.success(function() { 
			console.log("jSon transfered to a new database OK"); 
		})
		.error(function(e) { 
			console.log("jSon error "+e); 
		})
		.complete(function() { 
			console.log("jSon dig completed."); 
		});	
	}		
}







	



