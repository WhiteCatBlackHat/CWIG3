function hideAll() {
	for(let i = 0; i < divId.length; i++) {
		const contentDiv = document.getElementById(divId[i]);
		contentDiv.hidden = true;
	}
}
function show(contentId) {
	hideAll();
	const contentDiv = document.getElementById(contentId);
	contentDiv.hidden = false;
}