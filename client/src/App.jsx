import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import PrivateRoute from './components/userContext/PrivateRoute';
import AdminDashboard from './layout/AdminDashboard';
import AdminUser from './layout/AdminUser';
import AdminHotel from './layout/AdminHotel';
import Delete from './pages/Delete';
import UserAccount from './pages/UserAccount';
import UserAccountEdit from './pages/UserAccountEdit';
import DeleteUser from './pages/DeleteUser';
import { useUser } from './components/userContext/userContext';
import Booking from './pages/Booking';
import AdminBooking from './layout/AdminBooking';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './App.css';
import ConfirmationPage from './pages/ConfirmationPage';

export default function App() {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Simulate a loading state only for Home and Admin Dashboard pages
  useEffect(() => {
    const targetPaths = ['/', '/admin' ,'/contact' , '/about'];
    if (targetPaths.includes(location.pathname)) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    } else {
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  return (
    <>
     
      {isLoading ? (
        // Display loading animation while isLoading is true
        <div className="loading-page flex justify-center items-center h-screen bg-gray-100">

    <DotLottieReact
      src="https://lottie.host/e32980de-2d5a-4f0c-96ae-853d398fecab/qJq4lBxhtz.lottie"
      loop
      autoplay
       className="w-40 h-40"
    />
        </div>
      ) : (
        
        // Render the actual app content
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/hotel/:id"
            element={
              <PrivateRoute>
                <ShowHotel />
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel/:id/review"
            element={
              <PrivateRoute>
                <Review />
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel/:id/booking"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/hotel/:id/confirmed"
            element={
              <PrivateRoute>
                <ConfirmationPage/>
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id/account"
            element={
              <PrivateRoute>
                <UserAccount />
              </PrivateRoute>
            }
          />
          <Route path="/user/:id/account/edit" element={<UserAccountEdit />} />
          <Route path="/user/:id/account/delete" element={<DeleteUser />} />
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/user/logout" element={<Logout />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            <Route path="users" element={<AdminUser />} />
            <Route path="hotels" element={<AdminHotel />} />
            <Route path="bookings" element={<AdminBooking />} />
            <Route path="new-hotel" element={<Create />} />
            <Route path="hotel-details/:id/edit" element={<Edit />} />
            <Route path="hotel/:id/delete" element={<Delete />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
