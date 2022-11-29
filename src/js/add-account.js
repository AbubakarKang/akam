//-----------------------------\\ ELEMENTS //-----------------------------\\

const emailInput = document.querySelector("[data-email-input]");
const accountInput = document.querySelector("[data-account-input]");
const accountsBody = document.querySelector("[data-accounts-body]");
const passwordInput = document.querySelector("[data-password-input]");
const addAccountPanel = document.querySelector("[data-add-account-panel]");
const informationInput = document.querySelector("[data-information-input]");
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
	informationInput.value = "";
	emailInput.value = "";
	uploadedImageDisplay.style.backgroundImage = "";
});
panelCloseButton.addEventListener("click", () => (addAccountPanel.style.display = "none"));
addAccountButton.addEventListener("click", () => addAccount());

const addAccount = () => {
	let accountName = accountInput.value;
	let password = passwordInput.value;
	let info = informationInput.value;
	let email = emailInput.value;

	if (accountName === "" || password === "" || info === "" || email === "") {
		return customAlert("Please fill all fields");
	}
	if (typeof uploadedImage === "undefined") {
		return customAlert("You have to upload an image.");
	}

	ipc.send("mainAddAccount", {
		accountName,
		password,
		info,
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
		let receivedInfo = accountData.accountInfo;

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
		accountPasswordDiv.classList.add("added-account-password");
		accountPasswordDiv.innerText = receivedPassword;

		let accountEmailDiv = document.createElement("div");
		accountDetailsDiv.append(accountEmailDiv);
		accountEmailDiv.classList.add("added-account-email");
		accountEmailDiv.innerText = receivedEmail;

		let accountInfoDiv = document.createElement("div");
		accountDetailsDiv.append(accountInfoDiv);
		accountInfoDiv.classList.add("added-account-information");
		accountInfoDiv.innerText = receivedInfo;

		// This is what the code above outputs in HTML
		/*<div class="account">
			<div class="account-left-content">
				<div style="background-image:url(${receivedImage})" class="account-image"></div>
			</div>
			<div class="account-right-content">
				<div class="account-name">${receivedAccountName}</div>
				<div class="account-details">
					<div class="account-password">${receivedPassword}</div>
					<div class="account-email">${receivedEmail}</div>
					<div class="account-information">${receivedInfo}</div>
				</div>
			</div>
		</div>;*/
	});
});
