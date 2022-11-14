//-----------------------------\\ FUNCTIONS //-----------------------------\\

document.querySelector("[data-yes-account]").addEventListener("click", () => {
	document.querySelector("[data-register-panel]").style.display = "none";
	document.querySelector("[data-login-panel]").style.display = "block";
});

document.querySelector("[data-no-account]").addEventListener("click", () => {
	document.querySelector("[data-register-panel]").style.display = "block";
	document.querySelector("[data-login-panel]").style.display = "none";
});
