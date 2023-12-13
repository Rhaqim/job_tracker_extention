document.addEventListener("DOMContentLoaded", function () {
	const applyingThrough = document.getElementById("applyingThrough");
	const jobWebsite = document.getElementById("jobWebsite");
	const company = document.getElementById("company");
	const role = document.getElementById("role");
	const keywords = document.getElementById("keywords");

	let geoid = "";
	let keywords_list = [];

	console.log("Popup DOM fully loaded and parsed");
	
	// Listen for messages from background script
	chrome.runtime.onMessage.addListener(function (
		message,
		sender,
		sendResponse
	) {
		if (message.action === "updatePopup") {
			const data = message.jobTitle;

			// Do something with the extracted data (e.g., update the popup UI)
			console.log("Header text from content script:", data);

			role.value = data;
		}
	});

	// Your existing code for populating popup fields based on the URL can remain unchanged.
	// ...

	// Get the current tab's URL
	// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 	const currentTab = tabs[0];
	// 	const websiteUrl = currentTab.url;

	// 	// strip the query params
	// 	const websiteUrlParams = websiteUrl.split("?")[1];

	// 	// get the geoid from the query params
	// 	let queries;

	// 	if (websiteUrlParams.includes("&")) {
	// 		queries = websiteUrlParams.split("&");
	// 	} else {
	// 		queries = [websiteUrlParams];
	// 	}

	// 	for (let i = 0; i < queries.length; i++) {
	// 		const query = queries[i].split("=");

	// 		if (query[0] === "geoId" || query[0] === "geoid") {
	// 			geoid = query[1];
	// 		}

	// 		if (query[0] === "keywords") {
	// 			keywords_list = query[1].split("%20");
	// 		}
	// 	}

	// 	// strip the website url get just the first part after the https unless its docs/web then get the second
	// 	const websiteUrlSplit = websiteUrl.split("/");

	// 	// split the url with . and check if there are 3 parts, get the second part else get the first part
	// 	const mid_part = websiteUrlSplit[2].split(".");
	// 	let foundAt = mid_part.length === 3 ? mid_part[1] : mid_part[0];

	// 	console.log("Found at: ", foundAt);

	// 	jobWebsite.value = websiteUrl;
	// 	applyingThrough.value = foundAt;
	// 	// join keywords with a space
	// 	// keywords.value = keywords_list[0];
	// });

	// populate country dropdown
	const countrySelect = document.getElementById("country");

	fetch("utils/countries.json")
		.then(response => response.json())
		.then(data => {
			data.forEach(country => {
				const option = document.createElement("option");
				option.value = country;
				option.text = country;
				countrySelect.appendChild(option);
			});
		})
		.catch(error => {
			console.log(error);
		});

	/* Selected Tags */
	const tagInput = document.getElementById("tag-input");
	const tagsContainer = document.querySelector(".tag-container");
	const selectedTagsContainer = document.querySelector(".selected-tags");
	const maxSelectedTags = 3;
	const selectedTags = new Set();

	let currentInputTag = ""; // Store the current input tag

	tagInput.addEventListener("input", e => {
		const inputTag = tagInput.value.trim();
		if (
			e.inputType === "insertText" &&
			e.data === " " &&
			currentInputTag &&
			selectedTags.size < maxSelectedTags
		) {
			// Add a tag when space is entered
			selectedTags.add(currentInputTag);
			tagInput.value = "";
			currentInputTag = "";
			updateSelectedTags();
		} else {
			currentInputTag = inputTag;
		}
	});

	tagInput.addEventListener("keydown", e => {
		if (
			e.key === "Enter" &&
			currentInputTag &&
			selectedTags.size < maxSelectedTags
		) {
			// Add a tag when Enter is pressed
			selectedTags.add(currentInputTag);
			tagInput.value = "";
			currentInputTag = "";
			updateSelectedTags();
		}
	});

	tagsContainer.addEventListener("click", e => {
		const clickedTag = e.target;
		if (clickedTag.classList.contains("tag")) {
			const tagName = clickedTag.getAttribute("data-tag");
			if (selectedTags.has(tagName)) {
				selectedTags.delete(tagName);
				clickedTag.classList.remove("selected-tag");
				updateSelectedTags();
			}
		}
	});

	function updateSelectedTags() {
		selectedTagsContainer.innerHTML = "";
		selectedTags.forEach(tag => {
			const selectedTag = document.createElement("div");
			selectedTag.textContent = tag;
			selectedTag.classList.add("selected-tag");
			selectedTag.addEventListener("click", () => {
				selectedTags.delete(tag);
				updateSelectedTags();
			});
			selectedTagsContainer.appendChild(selectedTag);
		});
	}
});
