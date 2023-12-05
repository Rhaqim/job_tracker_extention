// content.ts

// Check if the current URL matches the URL you are interested in
if (
	window.location.href.startsWith("http://example.com") ||
	window.location.href.startsWith("https://example.com") ||
	window.location.href.startsWith("https://www.linkedin.com/jobs/search/*")
) {
	// Use the chrome.runtime.sendMessage to send a message to your background script
	chrome.runtime.sendMessage({ action: "showPopup" });
}

// content.js
console.log("Content script running on this page: " + window.location.href);
// You can perform actions here, like showing a button, form, or your extension UI.
