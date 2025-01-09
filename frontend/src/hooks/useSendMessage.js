import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from 'axios';

const useSendMessage = ()=>{
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();

    const sendMessage = async (message) =>{
        setLoading(true);
        try{
            // const res = axios.post(`/api/messages/send/${selectedConversation._id}`,
            //     {message},
            //     {
            //         headers:{
            //             "Content-type":"application/json",
            //         }
            //     }
            // );

            const res = await axios.post(
                `/api/message/send/${selectedConversation._id}`,
                {message},
                {withCredentials:true}
            );
            if(res.error) throw new Error(res.error);
            // console.log("Here in sendMessage hook",res.data);
            setMessages([...messages,res.data]);
        }catch(err){
            console.log("Error in sending messages",err.message);
        }finally{
            setLoading(false);
        }
    };

    return {sendMessage,loading};
};

export default useSendMessage;