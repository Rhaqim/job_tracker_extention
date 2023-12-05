function handleAuthClick() {
	chrome.identity.getAuthToken({ interactive: true }, function (token) {
		if (chrome.runtime.lastError) {
			// Handle authentication error
			console.error(chrome.runtime.lastError);
			return;
		}

		// Use the obtained token for API requests
		makeAuthenticatedRequest(token);
	});
}
