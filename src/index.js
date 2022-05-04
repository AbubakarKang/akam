//---------------------------\\ IMPORTS //---------------------------\\

require("dotenv").config();

const { app, BrowserWindow, ipcMain } = require("electron");
const ejsElectron = require("ejs-electron");
const mongoose = require("mongoose");
const path = require("path");
const ipc = ipcMain;

//--------------------------\\ FUNCTIONS //--------------------------\\

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

	mainWindow.loadURL(path.join(__dirname, "views/index.ejs"));

	ipc.on("closeApp", () => mainWindow.close());
	ipc.on("minimizeApp", () => mainWindow.minimize());

	//--------------------------\\ MONGOOSE //---------------------------\\

	mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
	const db = mongoose.connection;

	// Testing code, to be removed
	db.on("error", () => console.log("Error connecting to database"));
	db.once("open", () => console.log("Connected to MongoDB"));

	// Registering new user
	ipc.on("registerUser", (_, data) => {
		// To be replaced with adding the data into the database
		console.log(data);
	});
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
