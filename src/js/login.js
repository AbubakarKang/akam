//-----------------------------\\ ELEMENTS //-----------------------------\\

const noAccountAnchor = document.querySelector("[data-no-account-link]");
const loginUsername = document.querySelector("[data-login-username]");
const loginPassowrd = document.querySelector("[data-login-password]");
const registerPage = document.querySelector("[data-register-page]");
const loginButton = document.querySelector("[data-login-btn]");
const loginPage = document.querySelector("[data-login-page]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

noAccountAnchor.addEventListener("click", () => {
	loginPage.style.zIndex = "1";
	registerPage.style.zIndex = "2";
});

loginButton.addEventListener("click", () => {
	let username = loginUsername.value;
	let password = loginPassowrd.value;
	ipc.send("loginUser", {
		username,
		password,
	});
});
