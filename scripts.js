var sidebar_width = "250px";

var navbar_open = true;

function toggleNav() {
	document.getElementById("menu").classList.toggle("change");
	if (navbar_open) {
		document.getElementById("sidenav").style.width = sidebar_width;
		document.getElementById("main").style.marginLeft = sidebar_width;

		navbar_open = false;
	} else {
		document.getElementById("sidenav").style.width = 0;
		document.getElementById("main").style.marginLeft = 0;

		navbar_open = true;
	}
}
