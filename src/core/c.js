// Listen for messages from the background script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   // Check if the message instructs to show the popup
//   if (message.action === "showPopup") {
//     // Add your logic to show the popup or interact with the DOM here
//     sendResponse({ message: "Hello from content script" });
//   }
// });

// contentScript.js

// const port = chrome.runtime.connect({ name: "content-script" });

// document.addEventListener("DOMContentLoaded", function () {
// 	if (/https:\/\/www\.linkedin\.com\/jobs\/search\/.*/.test(window.location.href)) {
// 		const headerElement = document.querySelector(".header");

// 		port.postMessage({ headerValue: headerElement.innerText });
// 	}
// });
