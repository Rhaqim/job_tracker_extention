chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.action === "showPopup") {
		// Extract data from the webpage

		// Add your logic to show the popup or interact with the DOM here
		var jobTitle = document.getElementsByClassName(
			"job-details-jobs-unified-top-card__job-title-link"
		)[0].innerHTML;

		// clear white spaces in job title
		jobTitle = jobTitle.replace(/\s+/g, " ").trim();

		var companyName = document.getElementsByClassName(
			"job-details-jobs-unified-top-card__primary-description-container"
		)[0].innerText;

		const pattern = /^(.*?)\s*·\s*([\s\S]+?)\s*(\d+\s\w+\sago)\s*·\s*(.*?)$/;

		var location;
		var timeAgo;
		var otherInfo;

		const matches = companyName.match(pattern);
		if (matches) {
			companyName = matches[1];
			location = matches[2];
			timeAgo = matches[3];
			otherInfo = matches[4];
		}

		var extracctedData = {
			jobTitle: jobTitle,
			companyName: companyName,
			location: location,
			timeAgo: timeAgo,
			otherInfo: otherInfo,
		};

		// Send the extracted data back to the background script
		sendResponse({ data: extracctedData });
	}
});
