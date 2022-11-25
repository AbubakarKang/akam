//-----------------------------\\ ELEMENTS //-----------------------------\\

const emailInput = document.querySelector("[data-email-input]");
const accountInput = document.querySelector("[data-account-input]");
const passwordInput = document.querySelector("[data-password-input]");
const addAccountPanel = document.querySelector("[data-add-account-panel]");
const informationInput = document.querySelector("[data-information-input]");
const panelCloseButton = document.querySelector("[data-panel-close-button]");
const addAccountButton = document.querySelector("[data-add-account-button]");
const imageUploaderInput = document.querySelector("[data-image-uploader-input]");
const openPanelButton = document.querySelector("[data-open-add-account-panel-btn]");
const uploadedImageDisplay = document.querySelector("[data-uploaded-image-display]");

//------------------------------\\ OTHERS //-------------------------------\\

let uploadedImage;

//-----------------------------\\ FUNCTIONS //-----------------------------\\

imageUploaderInput.addEventListener("change", function () {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		uploadedImage = reader.result;
		uploadedImageDisplay.style.backgroundImage = `url(${uploadedImage})`;
	});
	reader.readAsDataURL(this.files[0]);
});

openPanelButton.addEventListener("click", () => (addAccountPanel.style.display = "block"));
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
};
