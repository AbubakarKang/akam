//-----------------------------\\ ELEMENTS //-----------------------------\\

const addAccountPanel = document.querySelector("[data-add-account-panel]");
const panelCloseButton = document.querySelector("[data-panel-close-button]");
const addAccountButton = document.querySelector("[data-add-account-button]");
const imageUploaderInput = document.querySelector("[data-image-uploader-input]");
const openPanelButton = document.querySelector("[data-open-add-account-panel-btn]");
const uploadedImageDisplay = document.querySelector("[data-uploaded-image-display]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

imageUploaderInput.addEventListener("change", function () {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		const uploadedImage = reader.result;
		uploadedImageDisplay.style.backgroundImage = `url(${uploadedImage})`;
	});
	reader.readAsDataURL(this.files[0]);
});

openPanelButton.addEventListener("click", () => (addAccountPanel.style.display = "block"));
panelCloseButton.addEventListener("click", () => (addAccountPanel.style.display = "none"));
addAccountButton.addEventListener("click", () => addAccount());

const addAccount = () => {};
