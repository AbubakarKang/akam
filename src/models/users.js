const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userID: Number, // Number of users + 1 *Must be unique
	username: String,
	password: String,
	email: String,
	isLoggedIn: {
		type: Boolean,
		default: false,
	},
	creationDate: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("User", userSchema);
