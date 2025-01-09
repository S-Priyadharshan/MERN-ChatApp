import { useState } from "react";
import { enqueueSnackbar, useSnackbar } from "notistack";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()
    const {enqueueSnackbar} = useSnackbar()

    const signup = async ({username,email,password,confirmPassword}) =>{
      const success = errorHandler({username,email,password,confirmPassword});
      if(!success) return;
      
      setLoading(true);
      const data = {
        username,
        email,
        password,
        confirmPassword
      };
      try{
        const res = await axios.post('/api/auth/signup',data,{withCredentials:true})
        if(res.error) throw new Error(res.error);
        localStorage.setItem("chat-user",JSON.stringify(res))
        setAuthUser(res)
      }catch(err){
        console.log("Error in signup hook",err);
      }finally{
        setLoading(false);
      }
    }

    return {loading,signup};
}

export default useSignup;

function errorHandler({username,email,password,confirmPassword}){
    if(!username||!email||!password||!confirmPassword){
        enqueueSnackbar("Please fill in all fields",{variant:"error"});
        return false;
    }
    if(password!=confirmPassword){
        enqueueSnackbar("Passwords must match",{variant:"error"});
        return false;
    }
    if(password.length < 5){
        enqueueSnackbar("Password must be atleast 5 Characters");
        return false;
    }

    return true;
}

