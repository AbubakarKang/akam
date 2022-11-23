//-----------------------------\\ ELEMENTS //-----------------------------\\

const haveAccountAnchor = document.querySelector("[data-have-account-link]");
const registerUsername = document.querySelector("[data-register-username]");
const registerPassowrd = document.querySelector("[data-register-password]");
const registerButton = document.querySelector("[data-register-btn]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

haveAccountAnchor.addEventListener("click", () => {
	registerPage.style.zIndex = "1";
	loginPage.style.zIndex = "2";
});

registerButton.addEventListener("click", () => {
	let username = registerUsername.value;
	let password = registerPassowrd.value;
	ipc.send("registerUser", {
		username,
		password,
	});
});
