import { useEffect,useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = ()=>{
    const [loading,setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    const {authUser} = useAuthContext();

    useEffect(()=>{
        const getMessages = async() =>{
            setLoading(true);
            try{
                const res = await axios.get(`/api/message/${selectedConversation._id}`)
                if(res.error) throw new Error(res.error);
                setMessages(res.data);
            }catch(err){
                setLoading(false);
                console.log("Error in getting Messages",err.message);
            }finally{
                setLoading(false);
            }
        };

        if(selectedConversation?._id) getMessages();
    },[selectedConversation?._id, setMessages]);

    return {messages, loading};
}

export default useGetMessages;