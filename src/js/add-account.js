//-----------------------------\\ ELEMENTS //-----------------------------\\

const notesInput = document.querySelector("[data-notes-input]");
const emailInput = document.querySelector("[data-email-input]");
const accountInput = document.querySelector("[data-account-input]");
const accountsBody = document.querySelector("[data-accounts-body]");
const passwordInput = document.querySelector("[data-password-input]");
const addAccountPanel = document.querySelector("[data-add-account-panel]");
const panelCloseButton = document.querySelector("[data-panel-close-button]");
const addAccountButton = document.querySelector("[data-add-account-button]");
const accountAdditionText = document.querySelector("[data-user-logged-text]");
const imageUploaderInput = document.querySelector("[data-image-uploader-input]");
const openPanelButton = document.querySelector("[data-open-add-account-panel-btn]");
const uploadedImageDisplay = document.querySelector("[data-uploaded-image-display]");

//------------------------------\\ OTHERS //-------------------------------\\

let uploadedImage;

//-----------------------------\\ FUNCTIONS //-----------------------------\\

imageUploaderInput.addEventListener("change", function () {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		readerResult = reader.result;
		fetch(readerResult)
			.then(res => res.blob())
			.then(blob => {
				let url = URL.createObjectURL(blob);
				uploadedImage = url;
				uploadedImageDisplay.style.backgroundImage = `url(${url})`;
			});
	});
	reader.readAsDataURL(this.files[0]);
});

openPanelButton.addEventListener("click", () => {
	addAccountPanel.style.display = "block";
	accountInput.value = "";
	passwordInput.value = "";
	notesInput.value = "";
	emailInput.value = "";
	uploadedImageDisplay.style.backgroundImage = "";
});
panelCloseButton.addEventListener("click", () => (addAccountPanel.style.display = "none"));
addAccountButton.addEventListener("click", () => addAccount());

const addAccount = () => {
	let accountName = accountInput.value;
	let password = passwordInput.value;
	let notes = notesInput.value;
	let email = emailInput.value;

	if (accountName === "" || password === "" || notes === "" || email === "") {
		return customAlert("Please fill all fields");
	} else if (accountName.length > 20) {
		return customAlert("Account name should not be more than 20 characters");
	} else if (notes.length > 40) {
		return customAlert("Notes should not be more than 40 characters.");
	}
	if (typeof uploadedImage === "undefined") {
		return customAlert("You have to upload an image.");
	}

	ipc.send("mainAddAccount", {
		accountName,
		password,
		notes,
		email,
		uploadedImage,
	});
	ipc.send("getAllAccounts");
};

ipc.on("displayAccountAddition", (event, data) => {
	let receivedAccountName = data[1];
	addAccountPanel.style.display = "none";
	accountAdditionText.innerText = `Your account ${receivedAccountName} has been successfully added!`;
	displayAccountCreation();
	accountsBody.innerHTML = "";
});

ipc.on("receiveAccounts", (event, data) => {
	Array.from(data).forEach(account => {
		let accountData = account._doc;

		let receivedImage = accountData.accountImage;
		let receivedAccountName = accountData.accountName;
		let receivedPassword = accountData.accountPassword;
		let receivedEmail = accountData.accountEmail;
		let receivedNotes = accountData.accountNotes;

		let accountDiv = document.createElement("div");
		accountsBody.append(accountDiv);
		accountDiv.classList.add("added-account");

		let accountLeftContentDiv = document.createElement("div");
		accountDiv.append(accountLeftContentDiv);
		accountLeftContentDiv.classList.add("added-account-left-content");
		let accountImageDiv = document.createElement("div");
		accountLeftContentDiv.append(accountImageDiv);
		accountImageDiv.classList.add("added-account-image");
		accountImageDiv.style.backgroundImage = `url(${receivedImage})`;

		let accountRightContentDiv = document.createElement("div");
		accountDiv.append(accountRightContentDiv);
		accountRightContentDiv.classList.add("added-account-right-content");
		let accountNameDiv = document.createElement("div");
		accountRightContentDiv.append(accountNameDiv);
		accountNameDiv.classList.add("added-account-name");
		accountNameDiv.innerText = receivedAccountName;

		let accountDetailsDiv = document.createElement("div");
		accountRightContentDiv.append(accountDetailsDiv);
		accountDetailsDiv.classList.add("added-account-details");

		let accountPasswordDiv = document.createElement("div");
		accountDetailsDiv.append(accountPasswordDiv);
		accountPasswordDiv.classList.add("added-account-instruction");
		accountPasswordDiv.innerText = "Click to open more information about the account.";

		addAccountFunctionality(accountDiv, receivedImage, receivedAccountName, receivedPassword, receivedEmail, receivedNotes);
		// This is what the code above outputs in HTML
		/*<div class="added-account">
			<div class="added-account-left-content">
				<div style="background-image:url(${receivedImage})" class="added-account-image"></div>
			</div>
			<div class="added-account-right-content">
				<div class="added-account-name">${receivedAccountName}</div>
				<div class="added-account-details">
					<div class="added-account-password">Click to open more information about the account.</div>
				</div>
			</div>
		</div>*/
	});
});
