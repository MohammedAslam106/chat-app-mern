import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface AuthContextProps{
    children:ReactNode
}

type ContextType={
    authUser:{_id:string;fullName:string;username:string;profilePic:string} | null;
    setAuthUser:Dispatch<SetStateAction<{_id:string;fullName:string;username:string;profilePic:string} | null>>
}

export const AuthContext=createContext<ContextType | null>(null)

export const useAuthContext=()=>{
    const context=useContext(AuthContext)

    if(!context){
        throw Error('Context out of the boundry!')
    }

    return context;
}

export default function AuthContextProvider({children}:AuthContextProps ){
    const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem('chat-user') || 'null') || null)
    return(
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}