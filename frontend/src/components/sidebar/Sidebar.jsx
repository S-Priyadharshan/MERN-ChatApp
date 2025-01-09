import React from 'react'

import './Sidebar.css'
import Search from './Search/Search'
import Conversations from './Conversations/Conversations'

const Sidebar = () => {
  return (
    <div className='app__sidebar'>
      <div className='app__sidebar-search'>
        <Search/>
      </div>
      <div className='app__sidebar-users'>
        <Conversations/>
      </div>
    </div>
  )
}

export default Sidebar