//--------------------------\\ VARIABLES //--------------------------\\

require("dotenv").config();

const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const ejsElectron = require("ejs-electron");
const passwordHandler = require("./encryption");
const User = require("./models/users");
const path = require("path");
const ipc = ipcMain;

var loggedIn = false;

//--------------------------\\ MONGOOSE //--------------------------\\

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

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
ipc.on("login-request", async (event, receivedData) => {
	let userArray = await User.find({ username: receivedData.username });
	if (userArray.length != 1) {
		console.log("User not found");
	} else {
		let user = userArray[0];
		if (user.password == receivedData.password) {
			loggedIn = true;
			console.log("User logged in");
		} else {
			console.log("Wrong password");
		}
	}
});

ipc.on("register-request", (event, receivedData) => {
	let newPassword = encryptPassword(receivedData.password);
	let newUser = new User({
		username: receivedData.username,
		email: receivedData.email,
		password: newPassword,
	});
	newUser.save();
});

function encryptPassword(password) {
	let passHandler = new passwordHandler();
	let encryptPattern = passHandler.encryptionPattern();
	let passwordCharsArray = password.split("");

	let encryptedPassword = "";
	passwordCharsArray.forEach(char => {
		encryptPattern.find(pattern => {
			if (pattern.character == char) {
				encryptedPassword += password.replace(char, pattern.replacingCharacter);
			}
		});
	});
	return encryptedPassword;
}
