import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

interface LoginProps{
    
}

export default function Login({}:LoginProps ){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const {login,loading}=useLogin()

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        await login({username,password})
    }
    return(
        <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className=" w-full p-6 rounded-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className=" text-3xl font-semibold text-center text-gray-300">
                    Login
                    <span className=" text-blue-500">
                        ChatApp
                    </span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className=" label p-2">
                            <span className=" text-base label-text">
                                Username
                            </span>
                        </label>
                        <input 
                        onChange={(e)=>setUsername(e.target.value)}
                        className=" w-full input input-bordered h-10" type="text" placeholder="Enter username" />
                    </div>

                    <div>
                        <label className=" label p-2">
                            <span className=" text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                        onChange={(e)=>setPassword(e.target.value)} className=" w-full input input-bordered h-10" type="password" placeholder="Enter Password" />
                    </div>

                    <Link to="/signup" className=" text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button 
                        disabled={loading}
                        className=" btn btn-block btn-sm mt-2">
                            {!loading ? 'Login' : 
                            <span className=" loading loading-spinner"></span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}