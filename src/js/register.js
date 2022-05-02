//-----------------------------\\ ELEMENTS //-----------------------------\\

const emailInput = document.querySelector("[data-email-input]");
const usernameInput = document.querySelector("[data-username-input]");
const passwordInput = document.querySelector("[data-password-input]");
const registerButton = document.querySelector("[data-register-button]");
const passwordConfirmInput = document.querySelector("[data-password-confirm-input]");

//------------------------------\\ OTHERS //-------------------------------\\

const allowedUsernameChars = "abcdefghijklmnopqrstuvwxyz0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//-----------------------------\\ FUNCTIONS //-----------------------------\\

registerButton.addEventListener("click", () => {
	const email = emailInput.value;
	const username = usernameInput.value;
	const password = passwordInput.value;
	const passwordConfirm = passwordConfirmInput.value;

	// ** alert functions are to be replaced with custom error display messages
	if (email === "" || username === "" || password === "" || passwordConfirm === "") {
		alert("Please fill all fields");
	} else if (password !== passwordConfirm) {
		alert("Passwords do not match");
	} else if (password.length < 6) {
		alert("Password must be at least 6 characters long");
	} else if (password.length > 20) {
		alert("Password must be less than 20 characters long");
	} else if (!email.includes("@")) {
		alert("Please enter a valid email");
	} else if (username.length < 6) {
		alert("Username must be at least 6 characters long");
	} else if (username.length > 15) {
		alert("Username must be less than 20 characters long");
	} else if (username.includes(" ")) {
		alert("Username cannot contain spaces");
	} else if (username.includes("!@#$%^&*()_+")) {
		alert("Username can only contain letters, numbers and underscores");
	}
	// ** Code below is to be replaced with a function which makes a call to the server to register the user
	console.log("Registered");
});
