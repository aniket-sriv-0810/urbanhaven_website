import {Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Show from './pages/Show';
import Edit from './pages/Edit';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar.jsx/Navbar';
import './App.css'
import RegisterUser from './pages/RegisterUser';

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/new" element={<Create/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/hotel/:id" element={<Show/>}/>
    <Route path="/hotel/:id/edit" element={<Edit/>}/>
    <Route path="/user/register" element={<RegisterUser/>}/>

    </Routes>
    </>
  )
}