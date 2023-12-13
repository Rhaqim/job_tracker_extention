// background.js

// Listen for extension installation or update
chrome.runtime.onInstalled.addListener(function () {
	// Set the default popup for the extension
	chrome.action.setPopup({ popup: "popup.html" });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// Check if the tab update is complete
	if (changeInfo.status === "complete") {
		// Check if the URL matches the conditions for showing the popup
		if (
			tab.url.startsWith("http://example.com") ||
			tab.url.startsWith("https://example.com") ||
			/https:\/\/www\.linkedin\.com\/jobs\/search\/.*/.test(tab.url)
		) {
			// Check if the user is authenticated
			chrome.identity.getAuthToken({ interactive: false }, function (token) {
				if (chrome.runtime.lastError || !token) {
					// User is not authenticated, show authentication popup
					chrome.action.setPopup({ popup: "src/popup.html" });

					// Inject content script when the page is fully loaded
					chrome.scripting.executeScript({
						target: { tabId: tabId },
						function: showPopupScript,
					});
				} else {
					// User is authenticated, show the regular popup
					chrome.action.setPopup({ popup: "src/auth.html" });
				}
			});
		}
	}
});

// Function to be executed by the content script
function showPopupScript() {
	chrome.runtime.sendMessage({ action: "showPopup" });
	// chrome.tabs.sendMessage(tabid, { action: "showPopup" }, function (response) {
	// 	console.log(response);
	// });
}
