// This background script runs in the background of the application and performs various tasks.

const isLinkedInJobs = tab =>
	/https:\/\/www\.linkedin\.com\/jobs\/search\/.*/.test(tab.url) ||
	/https:\/\/www\.linkedin\.com\/jobs\/collections\/recommended\/.*/.test(
		tab.url
	);

// Event listener to handle when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function () {
	// Perform initialization tasks here
	// - Set default settings for the extension
	// - Create necessary data structures or databases
	// - Register necessary permissions

	console.log("Extension installed.");

	// Event listener to handle when a tab is updated
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		// Perform actions when a tab is updated here
		// - Check for specific URL patterns or page content changes
		// - Modify tab properties or execute scripts on the tab

		if (changeInfo.status == "complete") {
			// Check if the user is authenticated
			chrome.identity.getAuthToken({ interactive: true }, function (token) {
				if (chrome.runtime.lastError && !token) {
					// User is not authenticated, show the authentication popup
					chrome.action.setPopup({ popup: "src/oauth.html" });
				} else {
					// User is not authenticated, show regular popup
					chrome.action.setPopup({ popup: "src/popup.html" });

					// check if the user is on linkedin
					if (isLinkedInJobs(tab)) {
						// store user email in chrome storage
						chrome.identity.getProfileUserInfo(function (userInfo) {
							chrome.storage.sync.set({ email: userInfo.email });
						});

						// Inject linkedin content script when the page is fully loaded
						chrome.scripting.executeScript({
							target: { tabId: tabId },
							files: ["src/linkedin_content.js"],
						});
					} else {
						// User is not on the linkedin jobs page, inject the regular content script
						chrome.scripting.executeScript({
							target: { tabId: tabId },
							files: ["src/content.js"],
						});
					}
				}
			});
		}
	});
});

// Other background script code goes here
// - Implement additional event listeners or functions as needed
// - Interact with external APIs or services
// - Manage data storage or caching
