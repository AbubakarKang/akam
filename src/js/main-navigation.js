//-----------------------------\\ ELEMENTS //-----------------------------\\

const signOutButton = document.querySelector("[data-sign-out-btn]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

signOutButton.addEventListener("click", () => ipc.send("logUserOut"));

ipc.on("userLoggedOut", () => {
	mainPage.style.zIndex = "1";
	mainPage.style.display = "none";
	loginPage.style.display = "flex";
	registerPage.style.display = "flex";
});
