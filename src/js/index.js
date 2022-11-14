//-----------------------------\\ ELEMENTS //-----------------------------\\

const haveAccountAnchor = document.querySelector("[data-yes-account]");
const registerPanel = document.querySelector("[data-register-panel]");
const noAccountAnchor = document.querySelector("[data-no-account]");
const loginPanel = document.querySelector("[data-login-panel]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

haveAccountAnchor.addEventListener("click", () => {
	registerPanel.style.display = "none";
	loginPanel.style.display = "block";
});

noAccountAnchor.addEventListener("click", () => {
	registerPanel.style.display = "block";
	loginPanel.style.display = "none";
});
