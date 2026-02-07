const validator = require("validator");

const validatSigupdata=(req)=>{
    const { firstName, lastName, emailId, password} = req.body;
    if (firstName.length == 0 || lastName.length == 0) {
    throw new Error("Please Enter the Name");
  } else if (firstName.length < 2 || firstName.length > 50) {
    throw new Error("Invlaid Name");
  } else if (lastName.length < 2 || lastName.length > 50) {
    throw new Error("Invlaid Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invlaid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  } 
}


module.exports = validatSigupdata;