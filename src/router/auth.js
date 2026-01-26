const express = require("express");
const authRouter = express.Router();
const User = require("../modules/user");

authRouter.post("/signup", async (req, res) => {
  try {
    console.log(req.body);

    const { firstName, lastName, emailId, password } = req.body;

    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
    });

    const savedUser = await user.save();
    res.json({ message: "data added to database", data: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving user" });
  }
});

module.exports = authRouter;
