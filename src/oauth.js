document.addEventListener("DOMContentLoaded", function () {
	const authButton = document.getElementById("authButton");

	authButton.addEventListener("click", function () {
		// Use the Chrome Identity API to initiate OAuth authentication
		chrome.identity.launchWebAuthFlow(
			{
				url:
					"https://accounts.google.com/o/oauth2/auth" +
					"?client_id=YOUR_CLIENT_ID" +
					"&redirect_uri=YOUR_REDIRECT_URI" +
					// Example Redirect URI for a Chrome extension
					// 'chrome-extension://your-extension-id/oauth2redirect'

					"&response_type=token" +
					"&scope=openid profile email",
				interactive: true,
			},
			function (redirectURL) {
				// Parse the redirectURL to extract the access token
				const accessToken = redirectURL.match(/[#&]access_token=([^&]*)/);

				if (accessToken) {
					// Store the access token in Chrome's local storage
					chrome.storage.local.set(
						{ accessToken: accessToken[1] },
						function () {
							console.log("Access Token stored:", accessToken[1]);
						}
					);

					// Optionally, close the authentication popup
					window.close();
				} else {
					console.error("Authentication failed.");
				}
			}
		);
	});
});
