//---------------------------\\ IMPORTS //---------------------------\\

require("dotenv").config();

const { app, BrowserWindow, ipcMain } = require("electron");
const { findOneAndUpdate } = require("./models/users");
const ejsElectron = require("ejs-electron");
const User = require("./models/users");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const path = require("path");
const ipc = ipcMain;

let accountInUse = null;

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

	mainWindow.addListener("close", async () => {
		if (!accountInUse) return;

		await User.findOneAndUpdate({ username: accountInUse }, { isLoggedIn: false });
		accountInUse = null;
	});

	// User log out functionality
	ipc.on("logUserOut", (event, data) => {
		if (!accountInUse) {
			console.log("No user found while signing out, closing window.");
			mainWindow.close();
			return;
		}
		User.find({ username: accountInUse }, (error, data) => {
			if (typeof data[0] === "undefined") {
				console.log("Error while signing out, closing window.");
				mainWindow.close();
			} else {
				User.findOneAndUpdate({ username: accountInUse }, { isLoggedIn: false }, () => {
					event.sender.send("userLoggedOut");
				});
			}
		});
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
	// Define all data received from client
	let receivedUsername = data.username;
	let receivedPassword = data.password;
	let receivedEmail = data.email;
	// Store necessary login info to be used when account is registered
	let loginInfo = [receivedUsername, receivedPassword];

	// Encrypt user password and store it in database
	let salt = bcryptjs.genSaltSync(10);
	let hashedPassword = bcryptjs.hashSync(receivedPassword, salt);

	User.find({ username: receivedUsername }, (error, data) => {
		// Check if the username client entered is already in use
		if (typeof data[0] !== "undefined") {
			let existingUsername = data[0].username;
			return event.sender.send("userExists", existingUsername);
		} else {
			User.find({}, (error, data) => {
				// newUserID is the number of registered accounts + 1
				let newUserID = data.length + 1;
				// Create an account with the necessary information
				let newUser = new User({
					username: receivedUsername,
					password: hashedPassword,
					email: receivedEmail,
					userID: newUserID,
				});
				newUser.save();
				// Display notification that account is registered
				event.sender.send("userRegistered", loginInfo);
			});
		}
	});
});

// Login user
ipc.on("loginUser", (event, data) => {
	// Define all data received from client
	let receivedUsername = data.username;
	let receivedPassword = data.password;
	User.find({ username: receivedUsername }, (error, data) => {
		// Check if the username client entered exists in database or not
		if (typeof data[0] === "undefined") {
			return event.sender.send("userNotFound");
		} else {
			let foundUser = data[0];
			let databasePassword = foundUser.password;

			bcryptjs.compare(receivedPassword, databasePassword, (error, res) => {
				// Check if the password client entered matches the password stored in database
				if (res) {
					User.find({ username: receivedUsername }, (error, data) => {
						let isUserLoggedIn = data[0].isLoggedIn;
						// Check if the account is already in use on another window or device
						if (isUserLoggedIn) {
							return event.sender.send("alreadyLoggedIn");
						} else {
							User.findOneAndUpdate({ username: receivedUsername }, { isLoggedIn: true }, () => {
								// Log the user in
								accountInUse = receivedUsername;
								event.sender.send("userLoggedIn");
							});
						}
					});
				} else {
					// Inform user of wrong password entered
					event.sender.send("wrongPassword");
				}
			});
		}
	});
});
