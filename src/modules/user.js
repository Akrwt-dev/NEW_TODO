const mongoose = require("mongoose");

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

module.exports = mongoose.model("User",userSchema)