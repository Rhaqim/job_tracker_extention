// makeAuthRequests.js

// This function makes an authenticated request using the stored access token
function makeAuthenticatedRequest(url, method = "GET", data = null) {
	chrome.storage.local.get(["accessToken"], function (result) {
		const accessToken = result.accessToken;

		if (!accessToken) {
			console.error("Access token not found.");
			return;
		}

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		};

		const requestOptions = {
			method: method,
			headers: headers,
		};

		if (data) {
			requestOptions.body = JSON.stringify(data);
		}

		fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log("Authenticated Request Response:", data);
			})
			.catch(error => {
				console.error("Authenticated Request Error:", error);
			});
	});
}
