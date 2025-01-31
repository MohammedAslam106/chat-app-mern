import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


export default function useSignup( ){
    const {setAuthUser}=useAuthContext()
    const [loading,setLoading]=useState(false)

    const signup=async ({fullName,username,password,confirmPassword,gender}:{fullName:string,username:string,password:string,confirmPassword:string,gender:string})=>{
        const success = handleInputErrors({fullName,username,password,confirmPassword,gender});

        if(!success) return;

        setLoading(true);
        try {
            const res= await fetch('/api/auth/signup',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({fullName,username,password,confirmPassword,gender})
            })

            const data=await res.json()

            // console.log(data)

            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user',JSON.stringify(data))

            setAuthUser(data);
        } catch (error:any) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }

    return {signup,loading}
    
}

function handleInputErrors({fullName,username,password,confirmPassword,gender}:{fullName:string,username:string,password:string,confirmPassword:string,gender:string}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields')
        return false
    }
    if(password !== confirmPassword){
        toast.error('Passwords do not match')
        return false
    }

    if(password.length < 6){
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true;
}