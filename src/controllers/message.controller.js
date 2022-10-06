const MessageModel = require('../model/message.model');

async function handleAddMessage(req, res){
    try{
        const { name, email, phone, message } = req.body;
        let newMessage = new MessageModel(req.body);
        newMessage = await newMessage.save();
        
        res.status(201).json({
            message: "message sent successfully",
            newMessage,
            statusCode: 201,
            success: true
        });
    }catch(err){
        res.status(400).json({
            message: "something went wrong",
            statusCode: 400,
            success: false
        });
    }
    
}

async function handleGetMessages(req, res){
    try{
        const messages = await MessageModel.find();

        res.status(200).json({
            message: "messages gotten successfully",
            messages,
            statusCode: 200,
            success: true
        });
    }catch(err){
        res.status(400).json({
            message: "something went wrong",
            statusCode: 400,
            success: false
        });
        
    }
}

async function handleMarkAsResolved(req, res){
    try{
        const { messageId } = req.body;
        
        const messageExists = await MessageModel.countDocuments({ _id: messageId });
        if(!messageExists){
            res.status(404).json({
                message: "message does not exist",
                success: false,
                statusCode: 404
            });
        }
        const message = await MessageModel.findOne({ _id: messageId });
        message["resolved"] = true;
        // return console.log(message);
        const resolveMessage = await MessageModel.replaceOne({ _id: messageId }, message);

        res.status(200).json({
            message: "messages successfully resolved",
            resolveMessage,
            statusCode: 200,
            success: true
        });
    }catch(err){
        res.status(400).json({
            message: "something went wrong",
            statusCode: 400,
            success: false
        });
    }

}


module.exports = { 
    handleAddMessage,
    handleGetMessages,
    handleMarkAsResolved
}