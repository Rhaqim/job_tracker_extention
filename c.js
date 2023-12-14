// contentScript.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "dataUpdate") {
		console.log("The request: ", request);

		// Handle the request for data update from popup
		// You can send relevant data from the content script to the popup if needed
		// For example, if there's a specific element you want to send, you can modify this part
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

		if (sendResponse) {
			console.log("Response callBack for content script", true);
			sendResponse(extracctedData);
		}
	}
});
