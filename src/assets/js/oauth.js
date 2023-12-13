window.onload = function () {
	document.querySelector("button").addEventListener("click", function () {
		chrome.identity.getAuthToken({ interactive: true }, function (token) {
			console.log(token);
		});
	});
};


// "exclude_matches": ["*://*/*foo*"],
// 			"include_globs": ["*example.com/???s/*"],
// 			"exclude_globs": ["*bar*"],
// 			"all_frames": false,
// 			"match_origin_as_fallback": false,
// 			"match_about_blank": false,
// 			"run_at": "document_idle",
// 			"world": "ISOLATED"