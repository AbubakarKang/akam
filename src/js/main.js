//-----------------------------\\ ELEMENTS //-----------------------------\\

const mainPage = document.querySelector("[data-main-page]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

ipc.on("userLoggedIn", () => {
	mainPage.style.zIndex = "2";
	mainPage.style.display = "block";
	loginPage.style.display = "none";
	registerPage.style.display = "none";
	accountsBody.innerHTML = "";
	ipc.send("getAllAccounts");
});
