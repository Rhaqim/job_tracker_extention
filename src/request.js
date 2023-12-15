window.addEventListener("DOMContentLoaded", function () {
	const applyingThrough = document.getElementById("applyingThrough");
	const jobWebsite = document.getElementById("jobWebsite");
	const company = document.getElementById("companyName");
	const role = document.getElementById("role");
	const tags = document.querySelector(".selected-tag") ?? "";

	const viewApplications = document.getElementById("viewApplications");
	const form = document.getElementById("jobApplicationForm");
	const formContainer = document.getElementById("formContainer");
	const success = document.getElementById("success");
	const errorDiv = document.getElementById("error");

	var userEmail;

	// get email from chrome storage
	chrome.storage.sync.get(["email"], function (result) {
		userEmail = result.email;
	});

	viewApplications.addEventListener("click", () => {
		chrome.tabs.create({
			url: "http://localhost:3000/viewApplications",
		});
	});

	form.addEventListener("submit", event => {
		event.preventDefault(); // Prevent the default form submission

		const data = {
			applyingThrough: applyingThrough.value,
			jobWebsite: jobWebsite.value,
			company: company.value,
			role: role.value,
			tags: tags.innerHTML,
			email: userEmail,
			date: new Date(),
		};

		fetch("/api/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(result => {
				// Handle the response from the server
				console.log(result);

				// change display to none and success to block
				formContainer.style.display = "none";
				success.style.display = "block";

				// reset form and change display to block after 5 seconds
				setTimeout(() => {
					formContainer.style.display = "block";
					success.style.display = "none";
					form.reset();
				}, 5000);
			})
			.catch(error => {
				// Handle any errors
				console.error(error);

				// change display to none and error to block
				formContainer.style.display = "none";
				errorDiv.style.display = "block";

				// reset form and change display to block after 5 seconds
				setTimeout(() => {
					formContainer.style.display = "block";
					errorDiv.style.display = "none";
					form.reset();
				}, 5000);
			});
	});
});
