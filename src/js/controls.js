//-----------------------------\\ ELEMENTS //-----------------------------\\

const refreshBtn = document.querySelector("[data-refresh-btn]");

//-----------------------------\\ FUNCTIONS //-----------------------------\\

refreshBtn.addEventListener("click", () => {
	ipc.send("getAllAccounts");
	accountsBody.innerHTML = "";
});
