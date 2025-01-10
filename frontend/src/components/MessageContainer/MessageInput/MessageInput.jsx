import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../../hooks/useSendMessage';
import './MessageInput.css'

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const buttonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }

  useEffect(()=>{
    buttonRef.current.disabled=(message.trim()==="");
  },[message]);

  return (
    <form onSubmit={handleSubmit} className='app__messageinput'>
      <div className='app__messageinput'>
        <input type='text'
          placeholder='Text here'
          value={message}
          onChange={(e) => setMessage(e.target.value)} />

        <button ref={buttonRef} type='submit' disabled>
          {loading ? <p>L</p> : <BsSend />}
        </button>
      </div>
    </form>
  );
}

export default MessageInput