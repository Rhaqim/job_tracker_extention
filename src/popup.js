console.log("Popup script loaded.");

var place;

function setRole(role) {
	console.log("Role received", role);

	document.getElementById("role").value = role.jobRole;
	document.getElementById("applyingThrough").value = role.foundAt;
	document.getElementById("jobWebsite").value = role.websiteUrl;
	document.getElementById("companyName").value = role.companyName;
	document.getElementById("role").value = role.jobRole;

	// populate country dropdown
	const countrySelect = document.getElementById("country");

	fetch("../utils/countries.json")
		.then(response => response.json())
		.then(data => {
			data.forEach(country => {
				const option = document.createElement("option");
				option.value = country;
				option.text = country;
				countrySelect.appendChild(option);

				// make default country equal to place
				if (role.place.includes(country)) {
					countrySelect.value = country;
				}
			});
		})
		.catch(error => {
			console.log(error);
		});
}

window.addEventListener("DOMContentLoaded", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { from: "popup" }, setRole);
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
