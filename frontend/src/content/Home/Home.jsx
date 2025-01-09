import React from 'react'

import './Home.css';

import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar'; 
import MessageContainer from '../../components/MessageContainer/MessageContainer';

const Home = () => {
  return (
    <div className='app__home'>
      <Navigation/>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home