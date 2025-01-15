const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.route.js');
const messageRoutes = require('./routes/messages.route.js');
const userRoutes = require('./routes/user.route');

const PORT=5000;

const app=express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:3000"],
    credentials: true,
}));
app.use(cookieParser());

const MONGO_URL='mongodb://127.0.0.1:27017/chat'

const connectToDb = async() =>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connection to DB successful");
    }catch(err){
        console.log("Error connection:",{err});
    }
}

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/users',userRoutes)


app.listen(PORT,()=>{
    console.log("Welcome to root");
    connectToDb();
});

app.get('/',(req,res)=>{
    res.send("This is the beginning");
})