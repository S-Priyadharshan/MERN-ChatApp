const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

const genTokenAndCookie = (userId,res) => {
    // console.log(userId);
    const token = jwt.sign({userId},"quqyeuwqhejknsdkaposda",{
        expiresIn: "15d",
    });
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        // sameSite:"strict"
        path: "/"
    });

    return token;
};

// const genTokenAndCookie = async (req, res, next) => {
//     console.log("In the gen token middleware");
//     const {username,password}=req.body;
//     const user = await User.findOne({username});
//     const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
//     // The above line compares the entered password to the hashed password and does OPTIONAL CHAINING (?.)
//     // If password exists then it return password else it return empty string
//     if(!user||!isPasswordCorrect){
//         return res.status(400).json({error:"Invalid Username or Password"});
//     }

//     const token = jwt.sign({"userId": user._id, "username": username},"quqyeuwqhejknsdkaposda",{
//         expiresIn: "15d",
//     });
//     req.user = user._id;
//     req.username = username;

//     res.cookie("jwt",token,{
//         maxAge: 15*24*60*60*1000,
//         httpOnly:true,
//         // sameSite:"strict"
//         path: "/"
//     });
//     next();
// }

module.exports = genTokenAndCookie;