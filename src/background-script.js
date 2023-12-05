// background.ts

// Listen for messages from content scripts
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// 	if (message.action === "showPopup") {
// 		// Trigger the popup
// 		chrome.action.openPopup();
// 	}

// 	if (message.action === "getTabId") {
// 		sendResponse({ tabId: sender.tab.id });
// 	}
// });

chrome.runtime.onStartup.addListener(function () {
	// Check if the user is authenticated
	console.log("onStartup");
	chrome.identity.getAuthToken({ interactive: false }, function (token) {
		if (chrome.runtime.lastError || !token) {
			// User is not authenticated, show authentication popup
			chrome.browserAction.setPopup({ popup: "popup.html" });
		} else {
			// User is authenticated, show regular popup
			chrome.browserAction.setPopup({ popup: "auth_popup.html" });
		}
	});
});
