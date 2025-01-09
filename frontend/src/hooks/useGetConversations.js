import { useEffect,useState } from "react";
import axios from "axios";

const useGetConversations = ()=>{
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations] = useState([]);

    useEffect(()=>{
        const getConversations = async (req,res) =>{
            setLoading(true);
            try{
                const res = await axios.get("/api/users", { withCredentials: true});
                // console.log(res);
                setConversations(res.data);
            }catch(err){
                setLoading(false);
                console.log("Error in gettting conversations",err.message);
            }finally{
                setLoading(false);
            }
        };

        getConversations();
    },[]);

    return {loading,conversations};
}

export default useGetConversations;