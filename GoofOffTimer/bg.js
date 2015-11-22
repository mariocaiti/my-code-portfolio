//	GoofOff Timer! 
//	for Chrome right now, coming soon to Safari and Firefox. RIP IE ;) 

window.onload = function() {
	startTimer();
};

function recvSitesData (request, sender, sendResponse) {
	if(request) {
		console.log("manageSites.js received.");
		document.getElementById("goodSitesList").innerHTML = "<ul>";
		for (var gr=0; gr<request[0].length; gr++) {
			document.getElementById("goodSitesList").innerHTML += "<li>"+request[0][gr]+"</li>";
		}
		document.getElementById("goodSitesList").innerHTML += "</ul>";
		
		document.getElementById("badSitesList").innerHTML = "<ul>";
		for (var br=0; br<request[1].length; br++) {
			document.getElementById("badSitesList").innerHTML += "<li>"+request[1][br]+"</li>";
		}
		document.getElementById("badSitesList").innerHTML += "</ul>";
		
		console.log("\tSo we will say\t"+sendResponse("Received")+"\tfrom tab #"+sender.tab+".");
// 		chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
// 			var code = 'window.location.reload();';
// 			chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});		//this causes a loop!
// 		});
		return true;
	} else {
		console.log("manageSites.js failed to send a request.");
		return false;
	}		
}

chrome.runtime.onMessage.addListener(recvSitesData);








	



