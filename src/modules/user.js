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


userSchema.method.getJwtToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: 'user._id' }, 'TODOAPP');
  return token;
}

userSchema.method.validatePassword = async function(passwordEnteredByTheUser){
  const user = this;
  const passwordHash = user.password;
  const ispasswordCorrect = await bcrypt.compare(passwordEnteredByTheUser,passwordHash)
  return ispasswordCorrect;
}

module.exports = mongoose.model("User",userSchema)