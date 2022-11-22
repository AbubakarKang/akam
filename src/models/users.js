const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userID: Number, // Number of users + 1 *Must be unique
	username: String,
	password: String,
	email: String,
	isLoggedIn: Boolean, // Can only login from 1 device
	creationDate: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("User", userSchema);
