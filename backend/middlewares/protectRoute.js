const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const protectRoute = async(req,res,next) =>{
    try{
        const token = req.cookies.jwt; //access the jwt(tokens) stored in the CLIENTS COOKIES
        if(!token){
            return res.status(401).json({error:"Unauthorised Access"});
        }
        
        const decoded = jwt.verify(token,"quqyeuwqhejknsdkaposda");

        if(!decoded){
            return res.status(401).json({error:"Verification Error"});
        }
        
        const user = await User.findById(decoded.userId).select("-password"); // the -password is to exclude the password field from being extracted

        if(!user){
            return res.status(404).json({error:"User not found!"});
        }

        req.user=user;
        next();
    }catch(err){    
        console.log("Error in protectRoute Middleware:",err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = protectRoute;