/* eslint-disable*/
import React from 'react'
import useConversation from '../../../../zustand/useConversation';

import './Conversation.css'

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  
  return (
    <div className={`app__conversation ${isSelected ? "selected":""}`}
    onClick={()=> setSelectedConversation(conversation)}>
      <div className='app__conversation-avatar'>
        {/* <p>Logo</p> */}
      </div>
      <div className='app__conversation-username'>
        {conversation.username}
      </div>
    </div>
  )
}

export default Conversation