import React, { useEffect } from 'react'
import useConversation from '../../zustand/useConversation';
import {useAuthContext} from '../../context/AuthContext';
import { TiMessages } from "react-icons/ti";


import './MessageContainer.css';

import Messages from './Messages/Messages';
import MessageInput from './MessageInput/MessageInput';

const MessageContainer = () => {
  const {selectedConversation,setSelectedConversation}=useConversation();

  useEffect(()=>{
    return ()=>setSelectedConversation(null);
  },[setSelectedConversation]);

  return (
    <div className='app__messages-container'>
      {!selectedConversation ? (
        <NoChatSelected/>
      ):(
        <>
          <div className='app__messages-header'>
            <div className='app__messages-avatar'></div>
            <h1>{selectedConversation.username}</h1>
          </div>
          <div className='app__messages-main'>
            <Messages/>
          </div>
          <div className='app__messages-input'>
            <MessageInput/>
          </div>
        </>
      )}   
    </div>
  )
}

const NoChatSelected = ()=>{
  const {authUser} = useAuthContext();
  console.table(authUser);
  if(!authUser) return(<p>Loading state....</p>);
  return(
    <div className='app__default' style={{cursor:"none"}}>
      <div className='app__default-box'>
        <h1 className='app__default-title'>Hey There! 👋 {authUser.username}</h1>
        <p className='app__default-text'>Select a chat to start messaging</p>
        <div className='app__default-icon-container'>
          <TiMessages className='app__default-icon' />
        </div>
      </div>
    </div>
  )
}

export default MessageContainer