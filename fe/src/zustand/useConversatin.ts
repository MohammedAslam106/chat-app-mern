import { create } from "zustand";


type ConversationType={
    selectedConversation:any,
    setSelectedConversation:(selectedConversation:any)=> void,
    messages:any[],
    setMessages:(messages:any)=> void
}

const useConversation=create<ConversationType>((set)=>{
    return (
        {
            selectedConversation:null,
            setSelectedConversation:(selectedConversation:any)=> set({selectedConversation}),
            messages:[],
            setMessages:(messages:any)=> set({messages})
        }
    )
})

export default useConversation;