import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversatin";
// import notificationSound from '../assets/sounds/notification.mp3'

import notificationSound from '../assets/sounds/warning-notification-call-184996.mp3'


export default function useListenMessages(){
    const {socket}=useSocketContext()

    const {messages,setMessages}=useConversation();

    useEffect(()=>{
        socket?.on('newMessage',(newMessage)=>{
            newMessage.shouldShake=true;
            const sound=new Audio(notificationSound)
            sound.play()
            setMessages([...messages,newMessage])
        })

        return ()=>{socket?.off('newMessage')}
    },[socket,messages])
}