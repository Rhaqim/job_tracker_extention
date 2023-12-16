console.log("LinkedIn content script loaded.");

function getJobRole() {
	var jobTitle = document.querySelectorAll(
		".job-details-jobs-unified-top-card__job-title-link"
	)[0].innerText || '';

	// clear white spaces in job title
	jobTitle = jobTitle.replace(/\s+/g, " ").trim();

	return jobTitle || '';
}

function getCompanyDetails() {
	var details = document.querySelectorAll(
		".job-details-jobs-unified-top-card__primary-description-container"
	)[0].innerText;

	const pattern = /^(.*?)\s*·\s*([\s\S]+?)\s*(\d+\s\w+\sago)\s*·\s*(.*?)$/;

	var companyName;
	var location;
	var timeAgo;
	var otherInfo;

	const matches = details.match(pattern);
	if (matches) {
		companyName = matches[1];
		location = matches[2];
		timeAgo = matches[3];
		otherInfo = matches[4];
	}

	var extracctedData = {
		companyName: companyName || '',
		place: location|| '',
		timeAgo: timeAgo|| '',
		otherInfo: otherInfo|| '',
	};

	return extracctedData;
}

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

	return foundAt;
}

chrome.runtime.sendMessage({
	from: "content",
	subject: "showPageAction",
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.from === "popup") {
		const websiteUrl = window.location.href;

		const foundAt = urlFoundAt(websiteUrl);

		const jobRole = getJobRole();
		const companyDetails = getCompanyDetails();

		const { companyName, place, timeAgo, otherInfo } = companyDetails;

		if (sendResponse) {
			sendResponse({
				jobRole,
				companyName,
				place,
				timeAgo,
				otherInfo,
				foundAt,
				websiteUrl,
			});
		}
	}
});
