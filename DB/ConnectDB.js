// MONGO_URL = mongodb+srv://admin:DmefmFz19UP7vQFt@cluster0.ptfyh.mongodb.net/Took-One?retryWrites=true&w=majority
const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;

