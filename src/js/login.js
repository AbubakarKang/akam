//-----------------------------\\ ELEMENTS //-----------------------------\\

const registerUsername = document.querySelector("[data-register-username]");
const registerPassowrd = document.querySelector("[data-register-password]");
const registerButton = document.querySelector("[data-register-btn]");
const loginUsername = document.querySelector("[data-login-username]");
const loginPassowrd = document.querySelector("[data-login-password]");
const loginButton = document.querySelector("[data-login-btn]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

registerButton.addEventListener("click", () => {
	let username = registerUsername.value;
	let password = registerPassowrd.value;
	ipc.send("registerUser", {
		username,
		password,
	});
});

loginButton.addEventListener("click", () => {
	let username = loginUsername.value;
	let password = loginPassowrd.value;
	ipc.send("loginUser", {
		username,
		password,
	});
});
