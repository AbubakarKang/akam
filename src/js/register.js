//-----------------------------\\ ELEMENTS //-----------------------------\\

const errorText = document.querySelector("[data-error-text]");
const emailInput = document.querySelector("[data-email-input]");
const errorDisplay = document.querySelector("[data-error-blackbg]");
const allInputs = document.getElementsByClassName("register-input");
const usernameInput = document.querySelector("[data-username-input]");
const passwordInput = document.querySelector("[data-password-input]");
const registerButton = document.querySelector("[data-register-button]");
const errorCloseButton = document.querySelector("[data-error-close-button]");
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
		return customAlert("Please fill all fields");
	} else if (password !== passwordConfirm) {
		return customAlert("Passwords do not match");
	} else if (password.length < 6) {
		return customAlert("Password must be at least 6 characters long");
	} else if (password.length > 20) {
		return customAlert("Password must be less than 20 characters long");
	} else if (!email.includes("@")) {
		return customAlert("Please enter a valid email");
	} else if (username.length < 6) {
		return customAlert("Username must be at least 6 characters long");
	} else if (username.length > 15) {
		return customAlert("Username must be less than 20 characters long");
	} else if (username.includes(" ")) {
		return customAlert("Username cannot contain spaces");
	} else if (username.includes("!@#$%^&*()_+")) {
		return customAlert("Username can only contain letters, numbers and underscores");
	}

	ipc.send("registerUser", {
		email,
		username,
		password,
	});
});

const customAlert = error => {
	errorText.innerText = error;
	errorDisplay.style.display = "block";
	errorCloseButton.addEventListener("click", () => {
		errorDisplay.style.display = "none";
	});
};

Array.from(allInputs).forEach(input => {
	let inputLabel = findLabelForInput(input);
	input.addEventListener("input", () => {
		inputLabel.style.marginTop = "-10px";
	});
});

function findLabelForInput(input) {
	labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if (labels[i].htmlFor == input.id) return labels[i];
	}
}
