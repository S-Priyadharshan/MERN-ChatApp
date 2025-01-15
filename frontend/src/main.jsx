import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {SnackbarProvider} from 'notistack'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,      // Opt-in to transition state updates
      v7_relativeSplatPath: true,     // Opt-in to new splat route behavior
    }}>
    <SnackbarProvider>
      <AuthContextProvider>
        <SocketContextProvider>
          <App/>
        </SocketContextProvider>
      </AuthContextProvider>
    </SnackbarProvider>
  </BrowserRouter>
)
