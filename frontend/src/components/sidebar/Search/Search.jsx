import React, { useState } from 'react'
import useConversation from '../../../zustand/useConversation';
import useGetConversations from '../../../hooks/useGetConversations';
import { useSnackbar } from 'notistack'


import './Search.css'

const Search = () => {
    const [search,setSearch] = useState('');
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!search) return;
        if(search.length < 3){
            return enqueueSnackbar("Name must be atleast 3 characters", {variant: 'error'});
        }

        const conversation = conversations.find((c)=>c.username.toLowerCase().includes(search.toLowerCase()))

        if(conversation){
            setSelectedConversation(conversation);
            setSearch("");
        }else{
            enqueueSnackbar("No User Found",{variant: "error"});
        }
    }   
    
  return (
    <div className='app__search'>
        <div className='app__search-heading'>
            <h1>Chats</h1>
        </div>
        <form className='app__search-form' onSubmit={handleSubmit}>
            <input type='text' 
            placeholder='Search...'  
            value={search}
            onChange={(e) =>  setSearch(e.target.value)}
            />
            <button type='submit'>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    </div>
  )
}

export default Search