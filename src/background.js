// This background script runs in the background of the application and performs various tasks.

// Event listener to handle when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function () {
	// Perform initialization tasks here
	// - Set default settings for the extension
	// - Create necessary data structures or databases
	// - Register necessary permissions

	console.log("Extension installed.");
});

// Event listener to handle when the extension is launched
chrome.runtime.onStartup.addListener(function () {
	// Perform startup tasks here
	// - Restore previous session state
	// - Load necessary data or configurations
	console.log("Extension started.");
});

// chrome.runtime.onMessage.addListener((msg, sender) => {
// 	// First, validate the message's structure.
// 	if (msg.from === "content" && msg.subject === "showPageAction") {
// 		// Enable the page-action for the requesting tab.
// 		// chrome.pageAction.show(sender.tab.id);
// 	}
// });

const isLinkedInJobs = tab =>
	/https:\/\/www\.linkedin\.com\/jobs\/search\/.*/.test(tab.url) ||
	/https:\/\/www\.linkedin\.com\/jobs\/collections\/recommended\/.*/.test(
		tab.url
	);

// Event listener to handle when a tab is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// Perform actions when a tab is updated here
	// - Check for specific URL patterns or page content changes
	// - Modify tab properties or execute scripts on the tab

	if (changeInfo.status == "complete") {
		// Check if the user is authenticated
		chrome.identity.getAuthToken({ interactive: true }, function (token) {
			if (chrome.runtime.lastError && !token) {
				console.log("It was not possible to get a token.");

				// User is authenticated, show the regular popup
				chrome.action.setPopup({ popup: "src/oauth.html" });
			} else {
				// check if the user is on linkedin
				if (isLinkedInJobs(tab)) {
					// store user email in chrome storage
					chrome.identity.getProfileUserInfo(function (userInfo) {
						chrome.storage.sync.set({ email: userInfo.email });
					});

					// User is not authenticated, show authentication popup
					chrome.action.setPopup({ popup: "src/popup.html" });

					// Inject content script when the page is fully loaded
					chrome.scripting.executeScript({
						target: { tabId: tabId },
						files: ["src/content.js"],
					});
				} else {
					// User is not on the linkedin jobs page, show the regular popup
					chrome.action.setPopup({ popup: "src/popup.html" });
				}
			}
		});
	}
});

// Event listener to handle when a tab is activated
// chrome.tabs.onActivated.addListener(function (activeInfo) {
// 	// Perform actions when a tab is activated here
// 	// - Retrieve information about the activated tab
// 	// - Update UI or perform specific actions based on the tab
//         console.log("Tab activated:", activeInfo);
// });

// Event listener to handle when the extension icon is clicked
// chrome.browserAction.onClicked.addListener(function(tab) {
// Perform actions when the extension icon is clicked here
// - Open a popup or execute a specific action
// - Modify tab properties or execute scripts on the tab
// });

// Other background script code goes here
// - Implement additional event listeners or functions as needed
// - Interact with external APIs or services
// - Manage data storage or caching
