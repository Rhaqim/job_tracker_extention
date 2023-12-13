chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.action === "showPopup") {
		// Extract data from the webpage

		// Add your logic to show the popup or interact with the DOM here
		var jobTitle = document.getElementsByClassName(
			"job-details-jobs-unified-top-card__job-title-link"
		)[0].innerHTML;

		// clear white spaces in job title
		jobTitle = jobTitle.replace(/\s+/g, " ").trim();

		// Send the extracted data back to the background script
		sendResponse({ jobTitle: jobTitle });
	}
});
