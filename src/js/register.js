//-----------------------------\\ ELEMENTS //-----------------------------\\

const emailInput = document.querySelector("[data-email-input]");
const usernameInput = document.querySelector("[data-username-input]");
const passwordInput = document.querySelector("[data-password-input]");
const registerButton = document.querySelector("[data-register-button]");
const passwordConfirmInput = document.querySelector("[data-password-confirm-input]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

registerButton.addEventListener("click", () => {
	const email = emailInput.value;
	const username = usernameInput.value;
	const password = passwordInput.value;
	const passwordConfirm = passwordConfirmInput.value;

	// ** More security checks to be added
	// ** alert functions are to be replaced with custom error display messages
	if (email === "" || username === "" || password === "" || passwordConfirm === "") {
		alert("Please fill all fields");
	} else if (password !== passwordConfirm) {
		alert("Passwords do not match");
	}

	// ** Code below is to be replaced with a function which makes a call to the server to register the user
	console.log("Registered");
});
