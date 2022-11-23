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
		minWidth: 1000,
		minHeight: 600,
		frame: false,
		webPreferences: {
			devTools: true,
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	mainWindow.maximize();

	mainWindow.loadURL(path.join(__dirname, "views/index.ejs"));

	ipc.on("closeApp", () => mainWindow.close());
	ipc.on("minimizeApp", () => mainWindow.minimize());
	ipc.on("maximizeApp", () => {
		if (mainWindow.isMaximized()) {
			mainWindow.unmaximize();
		} else {
			mainWindow.maximize();
		}
	});

	//--------------------------\\ MONGOOSE //---------------------------\\

	mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
	const db = mongoose.connection;

	// Testing code, to be removed
	db.on("error", () => console.log("Error connecting to database"));
	db.once("open", () => console.log("Connected to MongoDB"));
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

// Registering new user
ipc.on("registerUser", (event, data) => {
	let receivedUsername = data.username;
	let receivedPassword = data.password;
	let receivedEmail = data.email;
	let loginInfo = [receivedUsername, receivedPassword];

	let salt = bcryptjs.genSaltSync(10);
	let hashedPassword = bcryptjs.hashSync(receivedPassword, salt);

	User.find({ username: receivedUsername }, (error, data) => {
		if (typeof data[0] !== "undefined") {
			let existingUsername = data[0].username;
			return event.sender.send("userExists", existingUsername);
		} else {
			User.find({}, (error, data) => {
				let newUserID = data.length + 1;
				let newUser = new User({
					username: receivedUsername,
					password: hashedPassword,
					email: receivedEmail,
					userID: newUserID,
				});
				newUser.save();
				event.sender.send("userRegistered", loginInfo);
			});
		}
	});
});

// Login user
ipc.on("loginUser", (_, data) => {
	let receivedUsername = data.username;
	let receivedPassword = data.password;
	User.find({ username: data.username }, (error, data) => {
		if (typeof data[0] === "undefined") return;
		let foundUser = data[0];

		let databaseUsername = foundUser.username;
		let databasePassword = foundUser.password;

		bcryptjs.compare(receivedPassword, databasePassword, (error, res) => {
			console.log(res);
		});
	});
});
