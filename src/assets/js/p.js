// popup.js

// On popup load, request data from the background script
chrome.runtime.sendMessage({ action: "requestDataUpdate" }, response => {
	if (chrome.runtime.lastError) {
		console.error(chrome.runtime.lastError);
		return;
	}

	console.log("Response from the background script", response);
	document.getElementById("role").value = response.jobTitle;
});
