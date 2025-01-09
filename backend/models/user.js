const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
        minLength: 3,
        maxLength: 25,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
    },
    email:{
        type:String,
        required:true,
        max: 50,
        unique:true,
    },
    profilePic:{
        type:String,
        default:"",
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},
    {timestamps: true}
);

const User = mongoose.model("User",userSchema);

module.exports = User;

// Alice 
// pass123

// Bob
// pass1234

// Mark
// pass12345

// John
// pass123456