function addAccountFunctionality(account, image, username, password, email, notes) {
	const accountInfoPanel = document.querySelector("[data-account-info]");
	const accountInfoImage = document.querySelector("[data-account-info-image]");
	const accountInfoEmail = document.querySelector("[data-account-info-email]");
	const accountInfoNotes = document.querySelector("[data-account-info-notes]");
	const accountInfoCloseBtn = document.querySelector("[data-account-info-button]");
	const accountInfoUsername = document.querySelector("[data-account-info-username]");
	const accountInfoPassword = document.querySelector("[data-account-info-password]");

	account.addEventListener("click", () => {
		accountInfoPanel.style.display = "block";
		accountInfoImage.style.backgroundImage = `url(${image})`;
		accountInfoEmail.innerText = email;
		accountInfoNotes.innerText = notes;
		accountInfoUsername.innerText = username;
		accountInfoPassword.innerText = password;
		accountInfoCloseBtn.addEventListener("click", () => {
			accountInfoPanel.style.display = "none";
		});
	});
}
