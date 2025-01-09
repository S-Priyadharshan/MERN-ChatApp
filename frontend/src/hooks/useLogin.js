import { useState } from "react";
import {useAuthContext} from '../context/AuthContext.jsx';
import axios from "axios";
import { closeSnackbar, enqueueSnackbar, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; 

const useLogin = ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const {enqueueSnackbar} = useSnackbar(); 

    const login = async(username,password)=>{
        const success = handleInputErrors(username,password);
        if(!success) return false;
        setLoading(true);
        const data={
            username,
            password,
        };
        try{
            const res = await axios.post('/api/auth/login',data,{withCredentials:true});
            if(res.status===200){
                localStorage.setItem("chat-user",JSON.stringify(res.data));
                setAuthUser(res.data);
                return true;
            }else{
                enqueueSnackbar("Login Failed",{variant:"error"});
                console.log(res.data?.error);
                return false;
            }
        }catch(err){
            console.log("Error in login hook",err.message);
            enqueueSnackbar("Wrong Username or Password",{variant:"error",autoHideDuration:3000})
            return false;
        }finally{
            setLoading(false);
        }
    }

    return {loading,login};
}

function handleInputErrors(username,password){
    if(!username||!password){
        enqueueSnackbar("Please Fill in all fields",{variant:"error"});
        return false;
    }
    return true;
}

export default useLogin;