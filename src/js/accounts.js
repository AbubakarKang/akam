function addAccountFunctionality(account, image, username, password, email, information) {
	const accountInfoPanel = document.querySelector("[data-account-info]");
	const accountInfoImage = document.querySelector("[data-account-info-image]");
	const accountInfoEmail = document.querySelector("[data-account-info-email]");
	const accountInfoCloseBtn = document.querySelector("[data-account-info-button]");
	const accountInfoUsername = document.querySelector("[data-account-info-username]");
	const accountInfoPassword = document.querySelector("[data-account-info-password]");
	const accountInfoInformation = document.querySelector("[data-account-info-information]");

	account.addEventListener("click", () => {
		accountInfoPanel.style.display = "block";
		accountInfoImage.style.backgroundImage = `url(${image})`;
		accountInfoEmail.innerText = email;
		accountInfoUsername.innerText = username;
		accountInfoPassword.innerText = password;
		accountInfoInformation.innerText = information;
		accountInfoCloseBtn.addEventListener("click", () => {
			accountInfoPanel.style.display = "none";
		});
	});
}
