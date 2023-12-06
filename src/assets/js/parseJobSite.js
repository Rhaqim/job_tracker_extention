function parseJobSite(website) {
	if (website.includes("linkedin")) {
		return parseLinkedin(website);
	} else if (website.includes("indeed")) {
		return parseIndeed(website);
	} else if (website.includes("glassdoor")) {
		return parseGlassdoor(website);
	} else {
		return null;
	}
}

function parseLinkedin(link) {
	let jobTitle = document.querySelector(".topcard__title").innerText;
	let company = document.querySelector(".topcard__org-name-link").innerText;
	let location = document.querySelector(".topcard__flavor").innerText;
	let description = document.querySelector(".description__text").innerText;

	return {
		jobTitle,
		company,
		location,
		description,
		link,
	};
}

function parseIndeed(link) {
	let jobTitle = document.querySelector(
		".jobsearch-JobInfoHeader-title"
	).innerText;
	let company = document.querySelector(
		".jobsearch-InlineCompanyRating"
	).innerText;
	let location = document.querySelector(
		".jobsearch-InlineCompanyRating"
	).innerText;
	let description = document.querySelector(
		".jobsearch-JobComponent-description"
	).innerText;

	return {
		jobTitle,
		company,
		location,
		description,
		link,
	};
}

function parseGlassdoor(link) {
	let jobTitle = document.querySelector(".jobTitle").innerText;
	let company = document.querySelector(".jobHeaderCompanyInfo").innerText;
	let location = document.querySelector(".jobHeaderCompanyInfo").innerText;
	let description = document.querySelector(".jobDescriptionContent").innerText;

	return {
		jobTitle,
		company,
		location,
		description,
		link,
	};
}
