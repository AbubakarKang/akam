//-----------------------------\\ ELEMENTS //-----------------------------\\

const errorText = document.querySelector("[data-error-text]");
const errorDisplay = document.querySelector("[data-error-blackbg]");
const registerButton = document.querySelector("[data-register-btn]");
const registerEmail = document.querySelector("[data-register-email]");
const userLoggedBox = document.querySelector("[data-user-logged-box]");
const registerUsername = document.querySelector("[data-register-username]");
const registerPassowrd = document.querySelector("[data-register-password]");
const errorCloseButton = document.querySelector("[data-error-close-button]");
const haveAccountAnchor = document.querySelector("[data-have-account-link]");
const registerConfirmPassowrd = document.querySelector("[data-register-confirm-password]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

haveAccountAnchor.addEventListener("click", () => {
	registerPage.style.zIndex = "1";
	loginPage.style.zIndex = "2";
});

registerButton.addEventListener("click", () => {
	let email = registerEmail.value;
	let username = registerUsername.value;
	let password = registerPassowrd.value;
	let passwordConfirm = registerConfirmPassowrd.value;

	if (email === "" || username === "" || password === "" || passwordConfirm === "") {
		return customAlert("Please fill all fields");
	} else if (password !== passwordConfirm) {
		return customAlert("Passwords do not match");
	} else if (password.length < 6) {
		return customAlert("Password must be at least 6 characters long");
	} else if (password.length > 20) {
		return customAlert("Password must be less than 20 characters long");
	} else if (!email.includes("@") || !email.includes(".")) {
		return customAlert("Please enter a valid email");
	} else if (username.length < 6) {
		return customAlert("Username must be at least 6 characters long");
	} else if (username.length > 15) {
		return customAlert("Username must be less than 20 characters long");
	} else if (username.includes(" ")) {
		return customAlert("Username cannot contain spaces");
	} else if (username.includes("!") || username.includes("@") || username.includes("#") || username.includes("$") || username.includes("%") || username.includes("^") || username.includes("&") || username.includes("*") || username.includes("(") || username.includes(")") || username.includes("-") || username.includes("+") || username.includes("'") || username.includes('"')) {
		return customAlert("Username can only contain letters, numbers and underscores");
	}

	ipc.send("registerUser", {
		username,
		password,
		email,
	});
});

ipc.on("userExists", (_, username) => {
	return customAlert(`A user with the username ${username} already exists.`);
});

ipc.on("userRegistered", (_, data) => {
	loginPage.style.zIndex = "2";
	registerPage.style.zIndex = "1";
	let username = data[0];
	let password = data[1];

	loginUsername.value = username;
	loginPassowrd.value = password;
	displayAccountCreation();
});

const displayAccountCreation = () => {
	userLoggedBox.style.animation = "userLoggedBoxAnimation 300ms forwards";
	setTimeout(() => {
		userLoggedBox.style.animation = "userLoggedBoxAnimationRemove 300ms forwards";
	}, 2000);
};

const customAlert = error => {
	errorText.innerText = error;
	errorDisplay.style.display = "block";
	errorCloseButton.addEventListener("click", () => {
		errorDisplay.style.display = "none";
	});
};
