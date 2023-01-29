/* Import the HTML for the nav menu and footer! */

function includeHTML() {  // A function that loads the nav menu and footer into the current file
	var xhttp, file, z, i, element;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		element = z[i];
		file = element.getAttribute("load-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {element.innerHTML = this.responseText;}
					if (this.status == 404) {element.innerHTML = "Page not found.";}
					element.removeAttribute("load-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}
