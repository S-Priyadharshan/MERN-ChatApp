/* eslint-disable */
import React, { useEffect } from 'react'
import { extractTime } from '../../../utils/extractTime'
import useConversation from '../../../zustand/useConversation'
import { useAuthContext } from '../../../context/AuthContext';

import './Message.css';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatOrigin = fromMe ? "chat-end" : "chat-start";
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "chat-background-me" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  const handleEdit = () => {
    console.log(message._id);
  }
  const editBtn = fromMe ? <button onClick={handleEdit}><i className='fa fa-pencil'></i></button> : <></>

  return (
    <div className={`app__message ${chatOrigin}`}>
      <div className={`app__message-core ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className='app__message-time'>
        {formattedTime}
      </div>
      {/* <button onClick={handleEdit}>
        <i className='fa fa-pencil'></i>
      </button> */}
      {editBtn}
    </div>
  )
}

export default Message