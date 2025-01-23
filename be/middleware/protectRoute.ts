import jwt from 'jsonwebtoken'
import {type Request, type Response} from 'express'
import User from '../models/user.model';

const protectRoute=async(req:any,res:Response,next:any)=>{
    try {
        const token=req.cookies.jwt;

        if(!token){
            res.status(401).json({error:'Unauthorized - No Token Provided'})
            return 
        }

        const decode=jwt.verify(token,process.env.JWT_SECRETE!) as {userId:string};

        if(!decode){
            res.status(401).json({error:"Unauthorized - Invalid Token"})
            return 
        }

        const user= await User.findById(decode?.userId!)

        if(!user){
            res.status(404).json({error:'User not found'});
            return
        }

        req.user=user;

        next();
    } catch (error) {
        
    }
}


export default protectRoute;