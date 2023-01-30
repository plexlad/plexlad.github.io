/* Import the HTML for the nav menu and footer! */
window.onload = loadHTML;
function loadHTML() { includeHTML('/default.html')}

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
}

/* BLOG */
var config;
function initBlog() {
	$(document).ready(async function() {
		await $.getJSON("/pages/blog/config.json", function(data) {
			config = data;
		});
		// Creats the blog category template
		$(".content").html(`<h1>blog</h1><h2><em>categories</em></h2><ul id="categories" class="links inline"></ul>`);
		
		var ulContent = '';   // ulContent is going to be the innerHTML of the unordered list
		var categories = [];  // the categories created from the tags of config

		// generates the categories
		for (let i = 0; i < config.length; i++) {
			let tags = config[i].tags;
			for (let x = 0; x < tags.length; x++) {
				if (!categories.includes(tags[x])) {
					categories.push(tags[x]);
				}
			}
		}
		
		var ul = $("#categories");
		var colors = ['red', 'green', 'blue', 'purple', 'cyan', 'yellow'] // Colors used for fade effect in ulContent
		// generates ulContent and initializes it
		for (let i = 0; i < categories.length; i++) {
			ulContent += `<li><a class="fade-${colors[i%colors.length]}" href="javascript:void(0)">${categories[i]}</a></li>`;
		}
		ul.html(ulContent);
		
		// adds an onClick event for every a tag in the categories list
		// TODO: clean up this code for the love of all that is holy
		ul.children("li").each(function() {
			$(this).children("a").each(function() {
				$(this).on("click", function () {
					initCategory($(this).html());
				});
			});
		});
	});
}

// Load main content for category
function initCategory(category) {
	$(".content").html(`<a id="back-link" href="javascript:void(0)"><h2>back</h2></a><h1>${category}</h1><ul id="article-list"></ul>`);
	$("#back-link").on("click", function() { // Reloads previous data if back is pressed
		initBlog();
	});
	
	// Filters articles for the category
	var filteredArticles
	if (category != "all") {
		filteredArticles = config.filter(function(o) {
			return o.tags.includes(category);
		});
	} else {
		filteredArticles = config;
	}

	var ulContent = '';
	for (let i = 0; i < filteredArticles.length; i++) {
		let time = parseTimeDifference(new Date(filteredArticles[i].time));
		let title = filteredArticles[i].title;
		let credits = filteredArticles[i].credits;
		ulContent += `<li><a href="/pages/blog/${filteredArticles[0].file}.html"><h4>${title}</h4><h5>${credits}, ${time}</h5></a></li>`;
	}

	$("#article-list").html(ulContent);
}

/* TIME VALUES */
// TODO: Make this code nicer?
function parseTimeDifference(time) {
	let timeValue = Date.now() - time.getTime();
	let plural;
	if (Math.abs(timeValue) > 3.154e+10) {
		return returnTimeString(timeValue, 3.154e+10, ' year ago', ' years ago');
	} else if (Math.abs(timeValue) > 2.628e+9) {
		return returnTimeString(timeValue, 2.628e+9, ' month ago', ' months ago');
	} else if (Math.abs(timeValue) > 6.048e+8) {
		return returnTimeString(timeValue, 6.048e+8, ' week ago', ' weeks ago');
	} else if (Math.abs(timeValue) > 8.64e+7) {
		return returnTimeString(timeValue, 8.64e+7, ' day ago', ' days ago');
	} else if (Math.abs(timeValue) > 3.6e+6) {
		return returnTimeString(timeValue, 3.6e+6, ' hour ago', ' hours ago');
	} else if (Math.abs(timeValue) > 60000) {
		return returnTimeString(timeValue, 60000, ' minute ago', ' minutes ago');
	} else {
		return "just now";
	}
}

function returnTimeString(time, num, string, pluralString) {
	let roundingFunc;
	if (time < 0) { roundingFunc = Math.ceil } else ( roundingFunc = Math.floor )

	if (roundingFunc(time/num) > 1) { return `${roundingFunc(time/num)}${pluralString}` }
	else { return `${roundingFunc(time/num)}${string}` }
}
