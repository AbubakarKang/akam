//---------------------------\\ IMPORTS //---------------------------\\

require("dotenv").config();

const { app, BrowserWindow, ipcMain } = require("electron");
const ejsElectron = require("ejs-electron");
const User = require("./models/users");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
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
		let dataPassword = data.password;

		let salt = bcryptjs.genSaltSync(10);
		let hashedPassword = bcryptjs.hashSync(dataPassword, salt);

		let newUser = new User({
			username: data.username,
			email: data.email,
			password: hashedPassword,
		});
		newUser.save();
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
