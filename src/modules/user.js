const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    currentPassword: {
      type: String,
    },
    newPassword: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    photoURL: {
      type: String,
    },
  },
  { timestamps: true },
);


userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { _id: this._id },
    "TODOAPP",
    { expiresIn: "7d" }
  );
};


userSchema.methods.validatePassword = async function(passwordEnteredByTheUser){
  const user = this;
  const passwordHash = user.password;
  const ispasswordCorrect = await bcrypt.compare(passwordEnteredByTheUser,passwordHash)
  return ispasswordCorrect;
}

module.exports = mongoose.model("User",userSchema)