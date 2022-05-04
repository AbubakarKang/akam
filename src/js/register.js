//-----------------------------\\ ELEMENTS //-----------------------------\\

const emailInput = document.querySelector("[data-email-input]");
const usernameInput = document.querySelector("[data-username-input]");
const passwordInput = document.querySelector("[data-password-input]");
const registerButton = document.querySelector("[data-register-button]");
const passwordConfirmInput = document.querySelector("[data-password-confirm-input]");

//------------------------------\\ OTHERS //-------------------------------\\

const allowedUsernameChars = "abcdefghijklmnopqrstuvwxyz0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

//-----------------------------\\ FUNCTIONS //-----------------------------\\

registerButton.addEventListener("click", () => {
	const email = emailInput.value;
	const username = usernameInput.value;
	const password = passwordInput.value;
	const passwordConfirm = passwordConfirmInput.value;

	// ** alert functions are to be replaced with custom error display messages
	if (email === "" || username === "" || password === "" || passwordConfirm === "") {
		return alert("Please fill all fields");
	} else if (password !== passwordConfirm) {
		return alert("Passwords do not match");
	} else if (password.length < 6) {
		return alert("Password must be at least 6 characters long");
	} else if (password.length > 20) {
		return alert("Password must be less than 20 characters long");
	} else if (!email.includes("@")) {
		return alert("Please enter a valid email");
	} else if (username.length < 6) {
		return alert("Username must be at least 6 characters long");
	} else if (username.length > 15) {
		return alert("Username must be less than 20 characters long");
	} else if (username.includes(" ")) {
		return alert("Username cannot contain spaces");
	} else if (username.includes("!@#$%^&*()_+")) {
		return alert("Username can only contain letters, numbers and underscores");
	}

	ipc.send("registerUser", {
		email,
		username,
		password,
	});
});
