const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;