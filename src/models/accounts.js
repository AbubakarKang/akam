const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	user: String,
	accountName: String,
	accountPassword: String,
	accountEmail: String,
	accountInfo: String,
	// accountImage: String,
	creationDate: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("Account", accountSchema);
