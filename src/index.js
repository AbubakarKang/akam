const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const ejsElectron = require("ejs-electron");

const loggedIn = false;

if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
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

ipc.on("login-request", () => {
	console.log("login-request");
});
