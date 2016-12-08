var easyLink = document.getElementsByClassName("navbar-item")[0];
var mediumLink = document.getElementsByClassName("navbar-item")[1];
var hardLink = document.getElementsByClassName("navbar-item")[2];
var instructionsLink = document.getElementsByClassName("navbar-item")[3];
var title = document.querySelector("h1");


function linkChangeE(event) {
window.location.href = 'http://localhost:3000/';
}

function linkChangeM(event) {
window.location.href = 'http://localhost:3000/Medium';
}

function linkChangeH(event) {
window.location.href = 'http://localhost:3000/Hard';
}

function linkChangeI(event) {
window.location.href = 'http://localhost:3000/instructions';
}

function titleClick(event) {
	alert("You clicked the main header!");

}

easyLink.addEventListener('click', linkChangeE);
mediumLink.addEventListener('click', linkChangeM);
hardLink.addEventListener('click', linkChangeH);
instructionsLink.addEventListener('click', linkChangeI);
title.addEventListener('click', titleClick);
