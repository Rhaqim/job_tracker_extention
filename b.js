// background.js

chrome.runtime.onInstalled.addListener(function () {
	console.log("Background script running");
	// Request data update from content script
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if (changeInfo.status === "complete") {
			var websiteUrl = tab.url;

			// Get message from popup
			chrome.runtime.onMessage.addListener(function (
				request,
				sender,
				sendResponse
			) {
				if (request.action === "requestDataUpdate") {
					// Send message to content script
					// chrome.tabs.sendMessage(tabId, { action: "dataUpdate" }, response => {
					// 	console.log("Response from the content script", response);

					if (
						/https:\/\/www\.linkedin\.com\/jobs\/search\/.*/.test(websiteUrl)
					) {
						const foundAt = urlFoundAt(websiteUrl);
						if (sendResponse) {
							console.log("Response callBack", true);
							if (chrome.runtime.lastError) {
								console.error(chrome.runtime.lastError);
								return;
							}

							sendResponse({
								jobTitle: "Software Engineer",
								companyName: "Google",
								location: "Mountain View, CA",
								timeAgo: "2 days ago",
								otherInfo: "Full-time",
								websiteUrl: websiteUrl,
								foundAt: foundAt,
							});
						}
					}
					// });
				}
			});
		}
	});
});

function urlFoundAt(websiteUrl) {
	// strip the query params
	const websiteUrlParams = websiteUrl.split("?")[1];

	// get the geoid from the query params
	let queries;

	if (websiteUrlParams.includes("&")) {
		queries = websiteUrlParams.split("&");
	} else {
		queries = [websiteUrlParams];
	}

	for (let i = 0; i < queries.length; i++) {
		const query = queries[i].split("=");

		if (query[0] === "geoId" || query[0] === "geoid") {
			geoid = query[1];
		}

		if (query[0] === "keywords") {
			keywords_list = query[1].split("%20");
		}
	}

	// strip the website url get just the first part after the https unless its docs/web then get the second
	const websiteUrlSplit = websiteUrl.split("/");

	// split the url with . and check if there are 3 parts, get the second part else get the first part
	const mid_part = websiteUrlSplit[2].split(".");
	let foundAt = mid_part.length === 3 ? mid_part[1] : mid_part[0];

	console.log("Found at: ", foundAt);

	return foundAt;
}
