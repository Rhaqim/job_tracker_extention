chrome.runtime.onInstalled.addListener(function () {
	console.log("Extension is installed");
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === "complete") {
		if (/https:\/\/www\.linkedin\.com\/jobs\/search\/.*/.test(tab.url)) {
			chrome.scripting.executeScript({
				target: { tabId: tabId },
				function: function () {
					// Add your logic to show the popup or interact with the DOM here
					var jobTitle = document.getElementsByClassName(
						"job-details-jobs-unified-top-card__job-title-link"
					)[0].innerHTML;

					// clear white spaces in job title
					jobTitle = jobTitle.replace(/\s+/g, " ").trim();

					var companyName = document.getElementsByClassName(
						"job-details-jobs-unified-top-card__primary-description-container"
					)[0].innerText;

					const pattern =
						/^(.*?)\s*·\s*([\s\S]+?)\s*(\d+\s\w+\sago)\s*·\s*(.*?)$/;

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

					chrome.runtime.sendMessage({
						action: "header_value",
						value: extracctedData,
					});
				},
			});
		}
	}
});

function highlightBackground(tabid) {
	console.log("Highlighting background");
	chrome.tabs.sendMessage(
		tabid,
		{ action: "bghighlight", color: "green" },
		function (response) {
			console.log(response);
		}
	);
}
