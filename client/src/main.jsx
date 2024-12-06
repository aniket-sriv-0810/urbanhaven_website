
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider} from './components/userContext/userContext.jsx'

createRoot(document.getElementById('root')).render(

  <UserProvider>
  <BrowserRouter>
    <App />
</BrowserRouter>
</UserProvider>

)
