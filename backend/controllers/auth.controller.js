const User = require('../models/user.js');
const genTokenAndCookie = require('../utils/genToken.js');
const bcrypt = require('bcryptjs');

module.exports.signup = async(req,res)=>{
    try{
        const {username,password,email,confirmPassword}=req.body;

        const user = await User.findOne({username});
        
        if(user){
            return res.status(400).json({error: "Username already exists"});
        }

        if(password!=confirmPassword){
            return res.status(400).json({error:"Passwords don't match"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            username:username,
            password:hashedPassword,
            email:email,
        })

        if(newUser){
            genTokenAndCookie(newUser._id,res);
            const savedUser = await newUser.save();
            // res.status(200).json({
            //     _id: savedUser._id,
            //     username: savedUser.username,
            //     email: savedUser.email,
            // });
            res.redirect(302,'/');
        };
    }catch(err){
        console.log("Error in Signup",err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

module.exports.login = async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        // The above line compares the entered password to the hashed password and does OPTIONAL CHAINING (?.)
        // If password exists then it return password else it return empty string
        if(!user||!isPasswordCorrect){
            return res.status(400).json({error:"Invalid Username or Password"});
        }
        genTokenAndCookie(user._id,res);
        console.log(username);
        console.log("Login Successful");
        res.status(200).json({
            // _id:req.user._id,
            _id:user._id,
            username:username,
        });
    }catch(err){
        console.log("Error in login",err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

module.exports.logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        console.log("Logged out Successfully");
        res.status(200).json({message:"Logged Out Successfully"});
    }catch(err){
        console.log("Error during Logout",err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};
