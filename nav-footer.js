/* Import the HTML for the nav menu and footer! */

function includeHTML(fileloc) {  // A function that loads the nav menu and footer into the current file
	$('body').append($(`<div id="my-content"></div>`));
	var div = document.getElementById('my-content');

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {div.innerHTML = this.responseText;}
			if (this.status == 404) {div.innerHTML = "Page not found.";}
		}
	}
	xhttp.open("GET", fileloc, true);
	xhttp.send();
	return;
}
