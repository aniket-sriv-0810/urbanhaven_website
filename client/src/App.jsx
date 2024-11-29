import {Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Show from './pages/Show';
import Edit from './pages/Edit';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar.jsx/Navbar';
import './App.css'
export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/api/v1/new" element={<Create/>}/>
    <Route path="/api/v1/about" element={<About/>}/>
    <Route path="/api/v1/contact" element={<Contact/>}/>
    <Route path="/api/v1/hotel/:id" element={<Show/>}/>
    <Route path="/api/v1/hotel/:id/edit" element={<Edit/>}/>
    </Routes>

    </>
  )
}