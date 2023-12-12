chrome.runtime.onInstalled.addListener(function () {
	console.log("Extension is installed");
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === "complete") {
		if (tab.url.startsWith("https://example.com/")) {
            highlightBackground(tab.id);
			// chrome.scripting.executeScript({
			// 	target: { tabId: tabId },
			// 	function: highlightBackground,
			// });
            console.log("Script executed");
		}
	}
});

function highlightBackground(tabid) {
    console.log("Highlighting background");
	chrome.tabs.sendMessage(tabid, { action: "bghighlight", color: "green" }, function (response) {
		console.log(response);
	});
}
