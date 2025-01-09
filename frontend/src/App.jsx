import { React} from 'react'
import './App.css'

import Auth from './components/Auth/Auth';
import { Route, Routes,Navigate } from 'react-router-dom'
import Home from './content/Home/Home';
import { useAuthContext } from './context/AuthContext';

function App() {
  const {authUser}=useAuthContext();
  return (
    <Routes>
      <Route path='/' element={authUser ? <Home/> : <Navigate to={"/auth"}/>}/>
      <Route path='/auth' element={authUser ? <Navigate to={"/"}/> : <Auth/>} />
    </Routes>
  )
}

export default App
