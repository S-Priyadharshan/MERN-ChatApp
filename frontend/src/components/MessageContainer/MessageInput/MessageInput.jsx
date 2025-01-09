import React from 'react'
import { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../../hooks/useSendMessage';

const MessageInput = () => {
  const [message,setMessage] = useState("");
  const {loading,sendMessage} = useSendMessage();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='app__messageinput'>
        <input type='text'
        placeholder='Text here'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}/>

        <button type='submit'>
          {loading ? <p>L</p> : <BsSend/>}
        </button>
      </div>
    </form>
  );
}

export default MessageInput