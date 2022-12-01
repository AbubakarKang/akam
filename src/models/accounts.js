const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	user: String,
	accountName: String,
	accountPassword: String,
	accountEmail: String,
	accountNotes: String,
	accountImage: String,
	creationDate: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("Account", accountSchema);
