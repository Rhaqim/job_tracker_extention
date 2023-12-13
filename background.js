chrome.runtime.onInstalled.addListener(function () {
	console.log("Extension is installed");
});

chrome.action.onClicked.addListener(function (tab) {
	console.log("Extention Clicked");

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const currentTab = tabs[0];

		chrome.tabs.sendMessage(
			currentTab.id,
			{ checkScript: true },
			function (response) {
				if (!chrome.runtime.lastError) {
					console.log("Script already injected");

					chrome.tabs.sendMessage(
						currentTab.id,
						{ action: "showPopup" },
						function (response) {
							console.log("Response from content script: ", response);

							// Relay the data to popup.js
							chrome.runtime.sendMessage({
								action: "updatePopup",
								data: response,
							});
						}
					);
				} else {
					console.log("Injecting script from file");

					chrome.tabs.executeScript(
						currentTab.id,
						{ file: "contentScript.js" },
						function () {
							chrome.tabs.sendMessage(
								currentTab.id,
								{ action: "showPopup" },
								function (response) {
									console.log("Response from content script: ", response);

									// Relay the data to popup.js
									chrome.runtime.sendMessage({
										action: "updatePopup",
										data: response,
									});
								}
							);
						}
					);
				}
			}
		);
	});
});

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// 	if (changeInfo.status === "complete") {
// 		if (/https:\/\/www\.linkedin\.com\/jobs\/search\/.*/.test(tab.url)) {
// 			chrome.scripting.executeScript({
// 				target: { tabId: tabId },
// 				function: function () {
// 					// Listen for messages from the background script
// 					chrome.tabs.sendMessage(tabId, { action: "popup" }, function (response) {
// 						console.log(response);
// 					});

// 					// Add your logic to show the popup or interact with the DOM here
// 					var jobTitle = document.getElementsByClassName(
// 						"job-details-jobs-unified-top-card__job-title-link"
// 					)[0].innerHTML;

// 					// clear white spaces in job title
// 					jobTitle = jobTitle.replace(/\s+/g, " ").trim();

// 					var companyName = document.getElementsByClassName(
// 						"job-details-jobs-unified-top-card__primary-description-container"
// 					)[0].innerText;

// 					const pattern =
// 						/^(.*?)\s*·\s*([\s\S]+?)\s*(\d+\s\w+\sago)\s*·\s*(.*?)$/;

// 					var location;
// 					var timeAgo;
// 					var otherInfo;

// 					const matches = companyName.match(pattern);
// 					if (matches) {
// 						companyName = matches[1];
// 						location = matches[2];
// 						timeAgo = matches[3];
// 						otherInfo = matches[4];
// 					}

// 					var extracctedData = {
// 						jobTitle: jobTitle,
// 						companyName: companyName,
// 						location: location,
// 						timeAgo: timeAgo,
// 						otherInfo: otherInfo,
// 					};

// 					chrome.runtime.sendMessage({
// 						action: "header_value",
// 						value: extracctedData,
// 					});
// 				},
// 			});
// 		}
// 	}
// });

// function highlightBackground(tabid) {
// 	console.log("Highlighting background");
// 	chrome.tabs.sendMessage(
// 		tabid,
// 		{ action: "bghighlight", color: "green" },
// 		function (response) {
// 			console.log(response);
// 		}
// 	);
// }
