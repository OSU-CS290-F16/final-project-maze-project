var easyLink = document.getElementsByClassName("navbar-item")[0];
var mediumLink = document.getElementsByClassName("navbar-item")[1];
var hardLink = document.getElementsByClassName("navbar-item")[2];
var instructionsLink = document.getElementsByClassName("navbar-item")[3];
var title = document.querySelector("h1");



function linkChange(event) {
	alert("Link change!");
}

function titleClick(event) {
	alert("You clicked the main header!");
	
}



easyLink.addEventListener('click', linkChange);
mediumLink.addEventListener('click', linkChange);
hardLink.addEventListener('click', linkChange);
instructionsLink.addEventListener('click', linkChange);
title.addEventListener('click', titleClick);