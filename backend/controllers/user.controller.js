const User = require('../models/user');

module.exports.getAllUsers = async(req,res)=>{
    try{
        const loggedInUser = req.user._id;
        
        const filteredUsers = await User.find({_id : {$ne : loggedInUser}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch (err){
        console.log("Error in Getting Sidebar Users",err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}