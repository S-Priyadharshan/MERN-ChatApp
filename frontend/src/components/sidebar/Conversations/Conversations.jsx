import React from 'react'
import useGetConversations from '../../../hooks/useGetConversations';
import Conversation from './Conversation/Conversation';

import './Conversations.css';

const Conversations = () => {
  const {loading,conversations} = useGetConversations();
  return (
    <div className='conversations'>
      {loading ? (
        <p>Loading Conversations...</p>
      ):conversations.length > 0 ?(
        conversations.map((conversation)=>(
          <Conversation conversation={conversation} key={conversation._id}/>
        ))
      ):(
        <p>No Conversations Found</p>
      )
      }
    </div>
  )
}

export default Conversations