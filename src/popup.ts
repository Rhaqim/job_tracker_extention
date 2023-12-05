// Example JavaScript for the popup
document.addEventListener("DOMContentLoaded", function () {
	const button = document.getElementById("button") as HTMLButtonElement;

	button.addEventListener("click", function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id!, { action: "run" });
		});
	});
});
