import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


export default function useLogin( ){
    const {setAuthUser}=useAuthContext()
    const [loading,setLoading]=useState(false)

    const login=async ({username,password}:{username:string,password:string})=>{
        const success = handleInputErrors({username,password});

        if(!success) return;

        setLoading(true);
        try {
            const res= await fetch('/api/auth/login',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({username,password})
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

    return {login,loading}
    
}

function handleInputErrors({username,password}:{username:string,password:string}){
    if( !username || !password){
        toast.error('Please fill in all fields')
        return false
    }
    // if(password !== confirmPassword){
    //     toast.error('Passwords do not match')
    //     return false
    // }

    if(password.length < 6){
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true;
}