import {type Request, type Response} from 'express'
import Conversation from '../models/conversion.mdel';
import Message from '../models/message.model';

export const sendMessage=async(req:any,res:Response)=>{
    try {
        const {message}=req.body;

        const {id:receiverId}=req.params;

        const senderId=req.user.id

        let conversation=await Conversation.findOne({participants:{$all: [senderId,receiverId]}})

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage= new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // TODO: SOCKET IO FUNCTINALITY WILL GO HERE

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)
    } catch (error:any) {
        console.log("ERROR FROM sendMessage controller", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}


export const getMessages = async (req:any,res:Response)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;

        console.log(51,req.user)
        const conversation= await Conversation.findOne({
            participants:{$all: [senderId,userToChatId]}
        }).populate('messages');

        if(!conversation){
            res.status(200).json([])
            return
        }

        res.status(200).json(conversation.messages);
    } catch (error:any) {
        console.log("ERROR FROM getMessages controller", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}