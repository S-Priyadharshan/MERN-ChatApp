import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';

import './Navigation.css';

const Navigation = () => {
  const {loading,logout} = useLogout();

  return (
    <div className='app__navigation'>
        <div className='app__navigation-top'>
        <i className="fa-solid fa-comment"></i>
        <i className="fa-solid fa-plus"></i>
        </div>
        <div className='app__navigation-bottom'>
        <i className="fa-solid fa-gear"></i>
        <i className="fa-regular fa-user"></i>
        <div className='logout-btn'><BiLogOut onClick={logout}/></div>
        </div>
    </div>
  )
}

export default Navigation