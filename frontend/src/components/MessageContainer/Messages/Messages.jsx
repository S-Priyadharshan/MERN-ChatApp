import React from 'react'
import { useEffect, useRef } from 'react';
import useGetMessages from '../../../hooks/useGetMessages';
import Message from '../Message/Message';

import './Messages.css';
import useListenMessages from '../../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  // const { authUser } = useAuthContext();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className='app__messages'>
      {loading && <p>Loading Messages...</p>}
      {!loading &&
        messages.length > 0 && (
          messages.map((message) => {
            return (
              <div key={message._id} ref={lastMessageRef}>
                <Message message={message}/>
              </div>
            );
          })
        )}
      {!loading && messages.length === 0 && (
        <p className='app__startconvo'>Send a Message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages;


