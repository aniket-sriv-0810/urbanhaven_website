import {Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import ShowHotel from './pages/ShowHotel';
import Edit from './pages/Edit';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar.jsx/Navbar';
import RegisterUser from './pages/RegisterUser';
import LoginUser from './pages/LoginUser';
import Logout from './components/Logout/Logout';
import Review from './components/Review/Review';
import  PrivateRoute  from './components/userContext/PrivateRoute';
import AdminDashboard from './layout/AdminDashboard';
import AdminUser from './layout/AdminUser';
import './App.css'
import AdminHotel from './layout/AdminHotel';
import Delete from './pages/Delete';
import UserAccount from './pages/UserAccount';
import UserAccountEdit from './pages/UserAccountEdit';
import DeleteUser from './pages/DeleteUser';

export default function App() {
  return (
    <>

    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/hotel/:id" element={
      <PrivateRoute>
      <ShowHotel/>
      </PrivateRoute>
    }
    />

    <Route path="/hotel/:id/review" element={
      <PrivateRoute>
      <Review/>
      </PrivateRoute>
    }/>

    <Route path="/user/:id/account" element={
      <PrivateRoute>
      <UserAccount/>
      </PrivateRoute>
    }/>
    <Route path="/user/:id/account/edit" element={<UserAccountEdit/>}/>
    <Route path="/user/:id/account/delete" element={<DeleteUser/>}/>
    
    <Route path="/user/register" element={<RegisterUser/>}/>
    <Route path="/user/login" element={<LoginUser/>}/>
    <Route path="/user/logout" element={<Logout/>}/>

    <Route path="/admin" element={
      <PrivateRoute>
      <AdminDashboard/>
      </PrivateRoute>
    }>
    <Route path="users" element={<AdminUser/>}/>
    <Route path="hotels" element={<AdminHotel/>}/>
    <Route path="new-hotel" element={ <Create/>}/>
    <Route path="hotel-details/:id/edit" element={ <Edit/>}/>
    <Route path="hotel/:id/delete" element={ <Delete/>}/>
    </Route>

    </Routes>


    </>
  )
}