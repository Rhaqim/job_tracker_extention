const applyingThrough = document.getElementById("applyingThrough");
const jobWebsite = document.getElementById("jobWebsite");
const company = document.getElementById("companyName");
const role = document.getElementById("role");
const keywords = document.getElementById("keywords");

// Assuming you have a form with id "myForm" and an input field with id "email"
const form = document.getElementById("jobApplicationForm");
var userEmail;

// get email from chrome storage
chrome.storage.sync.get(["email"], function (result) {
	userEmail = result.email;
});

form.addEventListener("submit", event => {
	event.preventDefault(); // Prevent the default form submission

	const data = {
		applyingThrough: applyingThrough.value,
		jobWebsite: jobWebsite.value,
		company: company.value,
		role: role.value,
		keywords: keywords.value,
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
		})
		.catch(error => {
			// Handle any errors
			console.error(error);
		});
});
