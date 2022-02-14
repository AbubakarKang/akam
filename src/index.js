//--------------------------\\ VARIABLES //--------------------------\\

require("dotenv").config();

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const ejsElectron = require("ejs-electron");

const loggedIn = false;

//--------------------------\\ MONGOOSE //--------------------------\\

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

//--------------------------\\ FUNCTIONS //--------------------------\\

if (require("electron-squirrel-startup")) {
	app.quit();
}

// Creating browser window
const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		frame: false,
		resizable: false,
		webPreferences: {
			devTools: true,
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	ejsElectron.data("isLoggedIn", loggedIn);

	mainWindow.loadURL(path.join(__dirname, "views/index.ejs"));

	mainWindow.setMenuBarVisibility(false);

	ipc.on("closeApp", () => mainWindow.close());
	ipc.on("minimizeApp", () => mainWindow.minimize());
};

//------------------------\\ APP FUNCTIONS //------------------------\\

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

//-------------------------\\ IPC CALLS //-------------------------\\

// User login request (PROTOTYPE)
ipc.on("login-request", (event, receivedData) => {
	console.log(`Username: ${receivedData.username} | Password: ${receivedData.password}`);
});
