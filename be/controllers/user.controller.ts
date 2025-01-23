import {type Request, type Response} from 'express'
import User from '../models/user.model';

export const getUsersForSidebar = async (req:any,res:Response)=>{
    try {
        const loggedInUserId= req.user._id;

        const allUsers = await User.find({
            _id:{$ne:loggedInUserId}
        }).select('-password');

        res.status(200).json(allUsers)
    } catch (error:any) {
        console.log('Error in getUsersForSidebar',error.message)
        res.status(500).json({error:'Internal server error'})
    }
}