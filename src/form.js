document.addEventListener("DOMContentLoaded", function () {
	const jobApplicationForm = document.getElementById("jobApplicationForm");
	const websiteInput = document.getElementById("website");
	const appliedInfo = document.getElementById("appliedInfo");

	// Get the website URL from the URL parameter
	const urlParams = new URLSearchParams(window.location.search);
	const website = urlParams.get("website");

	if (website) {
		websiteInput.value = website;
	}

	jobApplicationForm.addEventListener("submit", function (event) {
		event.preventDefault();

		// Get form data
		const formData = new FormData(jobApplicationForm);
		const position = formData.get("position");
		const date = formData.get("date");
		const notes = formData.get("notes");

		// Display applied information
		appliedInfo.innerHTML = `
        Position: ${position}<br>
        Date Applied: ${date}<br>
        Notes: ${notes}
      `;

		// Clear form inputs
		jobApplicationForm.reset();
	});
});
