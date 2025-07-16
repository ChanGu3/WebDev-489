import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import 'bootstrap/dist/css/bootstrap.min.css' //[Import bootstrap css in your own files to use it]
import './tailwind.css'    //[Import tailwind css in your own files to use it]
import './pages/forgotpassword/ForgotPassword.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
