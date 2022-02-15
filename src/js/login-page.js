//-----------------------\\ DOM ELEMENTS //-----------------------\\

const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");
const loginButton = document.querySelector("[data-login-button]");
const usernameInputLabel = document.querySelector("[data-username-input-label]");
const passwordInputLabel = document.querySelector("[data-password-input-label]");

//------------------------\\ FUNCTIONS //-------------------------\\

usernameInput.addEventListener("focusin", () => {
	if (!usernameInput.classList.contains("focused")) {
		usernameInputLabel.classList.add("focused");
	}
});
usernameInput.addEventListener("focusout", () => {
	if (usernameInput.value === "" || usernameInput.value === null) {
		usernameInputLabel.classList.remove("focused");
	}
});

passwordInput.addEventListener("focusin", () => {
	if (!passwordInput.classList.contains("focused")) {
		passwordInputLabel.classList.add("focused");
	}
});
passwordInput.addEventListener("focusout", () => {
	if (passwordInput.value === "" || passwordInput.value === null) {
		passwordInputLabel.classList.remove("focused");
	}
});

loginButton.addEventListener("click", () => {
	ipc.send("login-request", {
		username: usernameInput.value,
		password: passwordInput.value,
	});
});
