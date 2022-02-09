//----------------------------\\ REQUIRES //----------------------------\\

const mongoose = require("mongoose");
require("dotenv").config();

//-----------------------------\\ CONNECT //----------------------------\\

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
