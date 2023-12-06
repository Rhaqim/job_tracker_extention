// content.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// Check if the message instructs to show the popup
	if (message.action === "showPopup") {
		// Add your logic to show the popup or interact with the DOM here

		// highlight the first paragraph
		document.querySelector("p").style.backgroundColor = "yellow";
		document.querySelector("p").style.color = "black";	


		console.log("Show popup logic in content script");
	}
});
