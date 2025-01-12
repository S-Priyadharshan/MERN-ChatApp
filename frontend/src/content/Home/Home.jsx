import React, { useEffect } from 'react'
import './Home.css';

import Navigation from '../../components/navigation/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/MessageContainer/MessageContainer';

const Home = () => {


  useEffect(() => {

    const handleMove = (e) => {
      const mousepos = { x: e.clientX, y: e.clientY };
      curSpan.style.top = `${mousepos.y}px`;
      curSpan.style.left = `${mousepos.x}px`;
    }
    
    const curSpan = document.createElement('span');
    curSpan.className = "cursor-blur";
    document.body.appendChild(curSpan);
    window.onmousemove = (e) => handleMove(e);

    return () => {
      window.onmousemove = null;
      document.body.removeChild(curSpan);
    };
  }, []);

  return (
    <div className='app__home'>
      <Navigation />
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home