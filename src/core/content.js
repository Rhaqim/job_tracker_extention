// content.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// Check if the message instructs to show the popup
	if (message.action === "showPopup") {
		// Add your logic to show the popup or interact with the DOM here

		document.body.style.backgroundColor = "red";
	}
});

// get the value of the span with class name job-card-container__primary-description
// var jobTitle = document.getElementsByClassName("job-details-jobs-unified-top-card__job-title-link")[0].innerText;

// chrome.runtime.sendMessage({ action: "header_value", value: jobTitle });

// var workName = document.getElementsByClassName("job-details-jobs-unified-top-card__primary-description-container")[0].innerText;
// var companyName2 = document.getElementsByClassName("topcard__org-name-link topcard__flavor--black-link")[0].innerText;
// var workTitle = document.getElementsByClassName("job-card-container__primary-description")[0].innerText;
