import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import useLogin from '../../hooks/useLogin';
import useSignup from '../../hooks/useSignup';

import './Auth.css';


const Auth = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    // const [loading,setLoading] = useState(false);
    const [setLoading] = useState(false);
    const {loginloading,login} = useLogin();
    const {signuploading,signup} = useSignup();
    const navigate = useNavigate();

    const handleFormChange = ()=>{
        setUsername('');
        setPassword('');
        setEmail('');
        setConfirmPassword('');
    }
    
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            const isSuccess = await login(username,password);
            if(isSuccess){
                navigate('/');
            }else{
                setUsername('');
                setPassword('');
            }
        }catch(err){
            console.log("Login Failed:",err);
            setUsername('');
            setPassword('');
        }
    }
    
    const handleSignup = async(e) =>{
        e.preventDefault();
        try{
            const isSuccess = await signup(username,email,password,confirmPassword);
            if(isSuccess){
                navigate('/');
            }
        }catch(err){
            console.log("Signup Failed",err);
        }
        // const date={
        //     username,
        //     email,
        //     password,
        //     confirmPassword
        // };
        // setLoading(true);
        // axios
        // .post('http://localhost:5000/api/auth/signup',date)
        // .then(()=>{
        //     setLoading(false);
        //     navigate('/');
        // })
        // .catch((err)=>{
        //     setLoading(false);
        //     console.log(err)
        // })
    }
    
    return (
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input className="toggle" type="checkbox" onClick={handleFormChange}/>
                    <span className="slider"></span>
                    <span className="card-side"></span>
                    <div className="flip-card__inner">
                        <div className="flip-card__front">
                            <div className="title">Log in</div>
                            <form action="" className="flip-card__form">
                                <input type="Username" placeholder="Username" name="Username" value={username} className="flip-card__input" onChange={(e)=> setUsername(e.target.value)} />
                                <input type="password" placeholder="Password" name="password" value={password} className="flip-card__input" onChange={(e)=> setPassword(e.target.value)}/>
                                <button className="flip-card__btn" onClick={handleLogin}>Let`s go!</button>
                            </form>
                        </div>
                        <div className="flip-card__back"> 
                            <div className="title">Sign up</div>
                            <form action="" className="flip-card__form">
                                <input type="Username" placeholder="Username" name="username" value={username} className="flip-card__input" onChange={(e)=> setUsername(e.target.value)}/>
                                <input type="email" placeholder="Email" name="email" value={email} className="flip-card__input" onChange={(e)=> setEmail(e.target.value)}/>
                                <input type="password" placeholder="Password" name="password" value={password} className="flip-card__input" onChange={(e)=> setPassword(e.target.value)}/>
                                <input type="password" placeholder="Confirm Password" name="password" value={confirmPassword} className="flip-card__input" onChange={(e)=> setConfirmPassword(e.target.value)}/>
                                <button className="flip-card__btn" onClick={handleSignup}>Confirm!</button>
                            </form>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default Auth