const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt")
const User = require("../modules/user");
const validatSigupdata = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {

    validatSigupdata(req);
    console.log(req.body);
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password,10)

    const user = new User({
      firstName,
      lastName,
      emailId,
      password : hashPassword,
    });
    const savedUser = await user.save();
    const token = await user.getJwtToken();
    res.cookie("token",token,{httpOnly:true})
    res.json({ message: "data added to database", data: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving user" });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("You have successfully log_out");
});
  

authRouter.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user = await User.findOne({emailId :emailId})
    if(!user){
      throw new Error ("User not found");
    }
    const ispassword =  await user.validatePassword(password);
    if(!ispassword){
      throw new Error("Invalid Details")
    }
    const token = user.getJwtToken();
    res.cookie("token",token, {  expires: new Date(Date.now() + 8 * 3600000), })
    res.send(user)
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Error saving user" });
  }
})

module.exports = authRouter;
