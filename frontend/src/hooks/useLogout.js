import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useLogout = ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const navigate = useNavigate();

    const logout = async()=>{
        setLoading(true);
        try{
            const res = await axios.post("/api/auth/logout",{withCredentials:true});
            if(res.error) throw new Error(res.error);
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            navigate("/auth");
        }catch(err){
            console.log("Error in Logout hook",err.messsage);
        }finally{
            setLoading(false);
        }
    }

    return {loading,logout};
};

export default useLogout;