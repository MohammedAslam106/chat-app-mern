import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { FormEvent, useState } from "react";
import useSignup from "../../hooks/useSignup";

interface signupProps{
    
}

export default function Signup({}:signupProps ){
    
    const {loading,signup}=useSignup()

    const [inputs,setInputs]=useState({
        fullName:'',
        username:'',
        password:'',
        confirmPassword:'',
        gender:''
    })

    const handleCheckboxChange=(gender:string)=>{
        setInputs({...inputs,gender})
    }

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        await signup(inputs)
    }
    return(
        <div className=' flex flex-col justify-center items-center min-w-96 mx-auto'>
            <div className=" w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className=" text-3xl font-semibold text-center text-gray-300">
                    Signup
                    <span className=" text-blue-500">
                        ChatApp
                    </span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className=" label p-2">
                            <span className=" text-base label-text">
                                Full Name
                            </span>
                        </label>
                        <input onChange={(e)=>{
                            setInputs({...inputs,fullName:e.target.value})
                        }} value={inputs.fullName} type="text" placeholder="Jhon Doe" className=" w-full input input-bordered h-10" />
                    </div>

                    <div>
                        <label className=" label p-2">
                            <span className=" text-base label-text">
                                Username
                            </span>
                        </label>
                        <input onChange={(e)=>{
                            setInputs({...inputs,username:e.target.value})
                        }} value={inputs.username} type="text" placeholder="jhondoe" className=" w-full input input-bordered h-10" />
                    </div>

                    <div>
                        <label className=" label p-2">
                            <span className=" text-base label-text">
                                Password
                            </span>
                        </label>
                        <input onChange={(e)=>{
                            setInputs({...inputs,password:e.target.value})
                        }} value={inputs.password}type="password" placeholder="Enter Password" className=" w-full input input-bordered h-10" />
                    </div>

                    <div>
                        <label className=" label p-2">
                            <span className=" text-base label-text">
                                Confirm Password
                            </span>
                        </label>
                        <input onChange={(e)=>{
                            setInputs({...inputs,confirmPassword:e.target.value})
                        }} value={inputs.confirmPassword}type="password" placeholder="Confirm Password" className=" w-full input input-bordered h-10" />
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

                    <Link to="/login" className=" text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account?</Link>

                    <div>
                        <button 
                        disabled={loading}
                        className=" btn btn-block btn-sm mt-2 border border-slate-700">
                            {!loading ? 'Sign Up' 
                            :
                            <span className=" loading loading-spinner">

                            </span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}