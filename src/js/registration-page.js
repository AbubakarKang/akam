//-----------------------\\ DOM ELEMENTS //-----------------------\\

const registrationButton = document.getElementById("registration-btn");

const emailInput = document.querySelector("[data-email-input]");
const usernameInput = document.querySelector("[data-username-input]");
const passwordInput = document.querySelector("[data-password-input]");
const passwordConfirmInput = document.querySelector("[data-password-confirm-input]");

const emailInputLabel = document.querySelector("[data-email-input-label]");
const usernameInputLabel = document.querySelector("[data-username-input-label]");
const passwordInputLabel = document.querySelector("[data-password-input-label]");
const passwordConfirmInputLabel = document.querySelector("[data-password-confirm-input-label]");

//--------------------------\\ OTHERS //--------------------------\\

// const { ipcRenderer } = require("electron");
// const ipc = ipcRenderer;

//-------------------------\\ FUNCTIONS //-------------------------\\

emailInput.addEventListener("focusin", () => emailInputLabel.classList.add("focused"));
usernameInput.addEventListener("focusin", () => usernameInputLabel.classList.add("focused"));
passwordInput.addEventListener("focusin", () => passwordInputLabel.classList.add("focused"));
passwordConfirmInput.addEventListener("focusin", () => passwordConfirmInputLabel.classList.add("focused"));

emailInput.addEventListener("focusout", () => {
	if (emailInput.value !== "" || emailInput.value == null) return;
	emailInputLabel.classList.remove("focused");
});
usernameInput.addEventListener("focusout", () => {
	if (usernameInput.value !== "" || usernameInput.value == null) return;
	usernameInputLabel.classList.remove("focused");
});
passwordInput.addEventListener("focusout", () => {
	if (passwordInput.value !== "" || passwordInput.value == null) return;
	passwordInputLabel.classList.remove("focused");
});
passwordConfirmInput.addEventListener("focusout", () => {
	if (passwordConfirmInput.value !== "" || passwordConfirmInput.value == null) return;
	passwordConfirmInputLabel.classList.remove("focused");
});

registrationButton.addEventListener("click", () => {
	// get all inputs from input fields and then compare password and password confirm input
	let email = emailInput.value;
	let username = usernameInput.value;
	let password = passwordInput.value;
	let passwordConfirm = passwordConfirmInput.value;
	if (password === passwordConfirm) {
		ipc.send("register-request", {
			username: username,
			email: email,
			password: password,
		});
	}
});
