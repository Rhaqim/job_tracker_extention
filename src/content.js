console.log("Regular content script loaded.");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.from === "popup") {
		const websiteUrl = "";
		const foundAt = "";
		const jobRole = "";
		const companyName = "";
		const place = "";
		const timeAgo = "";
		const otherInfo = "";

		if (sendResponse) {
			sendResponse({
				jobRole,
				companyName,
				place,
				timeAgo,
				otherInfo,
				foundAt,
				websiteUrl,
			});
		}
	}
});
