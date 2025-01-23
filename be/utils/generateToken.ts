import jwt from 'jsonwebtoken'
import { type Response } from 'express'

const generateTokenAndSetCookie=(userId:string,res:Response)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRETE!,{
        expiresIn:'15d'
    })

    res.cookie('jwt',token,{
        maxAge:15*25*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=='development'
    })
}

export default generateTokenAndSetCookie