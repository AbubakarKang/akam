//-----------------------------\\ ELEMENTS //-----------------------------\\

const addAccountPanel = document.querySelector("[data-add-account-panel]");
const panelCloseButton = document.querySelector("[data-panel-close-button]");
const openPanelButton = document.querySelector("[data-open-add-account-panel-btn]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

openPanelButton.addEventListener("click", () => (addAccountPanel.style.display = "block"));
panelCloseButton.addEventListener("click", () => (addAccountPanel.style.display = "none"));
