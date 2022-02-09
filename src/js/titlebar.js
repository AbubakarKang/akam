//-----------------------\\ DOM ELEMENTS //-----------------------\\

const titlebarCloseBtn = document.querySelector("[data-titlebar-close]");
const titlebarMinimizeBtn = document.querySelector("[data-titlebar-minimize]");

//--------------------------\\ OTHERS //--------------------------\\

const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

//-------------------------\\ FUNCTIONS //-------------------------\\

titlebarCloseBtn.addEventListener("click", () => ipc.send("closeApp"));
titlebarMinimizeBtn.addEventListener("click", () => ipc.send("minimizeApp"));
