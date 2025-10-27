const Message = require("../models/messageSchema");
const User = require("../models/userSchema");

exports.createMessage = async(req,res) => {
    try{
        const messageOwner = await User.findById(req.body["messageOwner"]);
        if(!messageOwner){
            return res.status(401).json({message: "Please login to create a new message"})
        }

        const newMessage = await Message.create({
            messageOwner: req.body["messageOwner"],
            chatRoom: req.body["chatRoom"],
            content: req.body["content"],

        });

        return res.status(201).json({data: newMessage, message: "Message created successfully"});

    
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.deleteMessage = async(req,res) => {
    try{
        const userTryingToDelete = await User.findById(req.body["messageOwner"])
        if(!userTryingToDelete){
            return res.status(404).json({message: "User trying to delete the message is not found"});
        }

        const message = await Message.findById(req.params["messageID"]);
        if(!message){
            return res.status(404).json({message: "Message is not found"});
        }

        if(userTryingToDelete._id.toString() !== message.messageOwner.toString()){
            return res.status(400).json({message: "User is not allowed to delete a message that is not owned by them"})
        }

        await message.deleteOne();

        return res.status(200).json({message:"Message deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.getMessage = async(req,res) => {
    try{
        const message = await Message.findById(req.params["chatRoomId"])
        //more
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }

};

exports.likeMessage = async(req,res) => {
    try{
        const message= await Message.findById(req.params["messageID"]);
        if(!message)
            return res.status(401).json({message: "login to like the message"});
        if(!message.likes.includes(req.body["userID"])){
            await message.updateOne({$push: {likes: req.body["userID"]}});
            return res.status(200).json({message: "The message has been liked"})
        } else{
            await message.updateOne({$pull: {likes: req.body["userID"]}})
            return res.status(200).json({message: "The message has been unliked"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    
    }
}