const jwt = require("jsonwebtoken")
const User = require("../modules/user")

const userAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
    if(!token){
        return res.status(401).send("Token not found")
    }
    const decodeData = jwt.verify(token,"TODOAPP")
    const user = await User.findById(decodeData._id);
    if(!user){
         return res.status(404).send("User Not Found!");
    }
    req.user=user;
    next();
    }catch(err){
         res.status(401).send("Authentication failed: " + err.message);
    }
}

module.exports = userAuth;