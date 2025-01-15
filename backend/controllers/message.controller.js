const Message = require('../models/message.js');
const Convo = require('../models/convo.js');
const {getReceiverSocketId, io} = require('../socket/socket.js');

module.exports.sendMessage = async (req,res)=>{
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;

        const senderId = req.user._id;

        let convo = await Convo.findOne({
            participants:{$all:[senderId,receiverId]},
        })


        if(!convo){
            convo = await Convo.create({
                participants:[senderId,receiverId]
            });
        };

        const newMessage = Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            convo.messages.push(newMessage._id);
        }
        await Promise.all([newMessage.save(),convo.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(200).json(newMessage);
    }catch(err){
        console.log("Error in sending message",err.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports.getMessage = async(req,res)=>{
    try{
        const senderId = req.user._id;
        const {id: receiverId} = req.params;
        const convo = await Convo.findOne({
            participants:{$all:[senderId,receiverId]},
        }).populate("messages");

        if(!convo) return res.status(200).json([]);
        
        const messages = convo.messages;        
        res.status(200).json(messages);
    }catch(err){
        console.log("Error is getMessages",err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

// module.exports.deleteMessage = async(req,res)=>{
//     try{

//     }catch(err){
//         console.log("Error in deleteMessage",err);
//     }
// }

// module.exports.editMessage = async(req,res)=>{
//     try{
//         const {id: msgId} =req.params;
//         const res = await Message.findByIdAndUpdate()
        
//     }catch(err){
//         console.log("Error in editMessage",err);
//     }
// }