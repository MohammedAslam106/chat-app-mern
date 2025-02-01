import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./AuthContext"
import io, { Socket } from 'socket.io-client'
// import { query } from "express"

interface SocketContextProps{
    children:ReactNode
}

type SocketContextType={
    socket:Socket | null;
    onlineUsers:any[]
}

const SocketContext=createContext<SocketContextType | null>(null)

export const useSocketContext=()=>{
    const context = useContext(SocketContext)

    if(!context){
        throw new Error('Context out of the boundry!')
    }

    return context;
}

export default function SocketContextProvider({children}:SocketContextProps ){
    const [socket,setSocket]=useState<Socket | null>(null);
    const [onlineUsers,setOnlineUsers]=useState([])

    const {authUser}=useAuthContext()


    useEffect(()=>{
        if(authUser){
            const newSocket = io(`http://localhost:5000`,{
                query:{
                    userId:authUser._id
                }
            });

            setSocket(newSocket);

            // socket.on() is used to listen to the events. Can be used both on client and server side.
            newSocket.on('getOnlineUsers',(users)=>{
                setOnlineUsers(users)
            })

            return ()=> {newSocket?.close()}
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}