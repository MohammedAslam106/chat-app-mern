import {type Request, type Response} from 'express'
import User from '../models/user.model';
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken';


export const signUpUser=async(req:Request,res:Response)=>{
    try {
        console.log('sighup user')
        const {fullName,username,password,confirmPassword,gender}=req.body;

        if(password !== confirmPassword){
            res.status(400).json({error:"Password don't match"})
            return
        }

        // HASH PASSWORD
        const hashPassword=await bcryptjs.hash(password,10);

        const user = await User.findOne({username})

        if(user){
            res.status(404).json({error:"Username already exists"})
            return
        }

        

        const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`

        const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser= new User({
            fullName,
            username,
            password:hashPassword,
            gender,
            profilePic:gender=='male' ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(Object(newUser._id),res)

            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })


        }else{
            res.status(400).json({error:'Invalid user data!'})
        }
        
    } catch (error:any) {
        console.log("Error in signup route",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}


export const loginUser=async(req:Request,res:Response)=>{
    try {
        const {username,password}=req.body;

        const user=await User.findOne({username})

        if(!user){
            res.status(404).json({
                error:'User not found!'
            })

            return
        }

        const isPasswordCorrect= await bcryptjs.compare(password,user.password)

        if(!isPasswordCorrect){
            res.status(400).json({error:"Invalid Credentials"})
            return
        }

        generateTokenAndSetCookie(Object(user._id),res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        });
    } catch (error:any) {
        console.log("Error in login route",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}


export const logoutUser=(req:Request,res:Response)=>{
    try {
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({message:'Logged out successfully'})
    } catch (error:any) {
        console.log("Error in login route",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}