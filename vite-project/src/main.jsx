import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';  // Import Tailwind CSS
import { AuthContextProvider } from "./context/Authcontext.jsx"; 


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)
