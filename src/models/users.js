const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	creationDate: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("User", userSchema);
