import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./App.css";


// Hotels Pages Routes
import Home from "./pages/Home";
import ShowHotel from "./pages/hotel/ShowHotel/ShowHotel";
import Review from "./components/Review/Review";
import Booking from "./pages/booking/Booking";
import ConfirmationPage from "./pages/booking/ConfirmationPage";


//Navigation Pages Routes
import About from "./pages/navigation/About";
import Contact from "./pages/navigation/Contact";
import PageNotFound from "./pages/loaders/PageNotFound";
import TermsAndConditions from "./pages/navigation/TermsAndConditions";


//Authentication Pages Routes
import RegisterUser from "./pages/authentication/register/RegisterUser";
import LoginUser from "./pages/authentication/login/LoginUser";
import Logout from "./components/Logout/Logout";

//Authentication Loaders Pages Routes
import AuthSuccessPopup from "./pages/loaders/AuthSuccessPopup";
import LoginLoader from "./pages/loaders/LoginLoader";


// Admin Pages Routes
import AdminRoute from "./components/userContext/AdminRoute";
import AdminDashboard from "./layout/AdminDashboard";
import AdminHome from "./layout/AdminHome";
import AdminUser from "./layout/AdminUser";
import AdminHotel from "./layout/AdminHotel";
import AdminBooking from "./layout/AdminBooking";
import AdminContact from "./layout/AdminContact";
import CreateHotel from "./pages/hotel/CreateHotel/CreateHotel";
import EditHotel from "./pages/hotel/EditHotel/EditHotel";
import DeleteHotel from "./pages/hotel/DeleteHotel/DeleteHotel";
import CreateBlog from "./pages/blogs/CreateBlog/CreateBlog";
import EditBlog from "./pages/blogs/EditBlog/EditBlog";
import DeleteBlog from "./pages/blogs/DeleteBlog/DeleteBlog";

//Blog Pages Routes
import AllBlogs from "./pages/blogs/AllBlogs/AllBlogs";
import ShowBlog from "./pages/blogs/ShowBlog/ShowBlog";


// User Account Pages Routes
import UserHome from "./pages/user/UserHome";
import UserAccount from "./pages/user/UserAccount";
import UserWishLists from "./pages/user/UserWishLists";
import UserBookings from "./pages/user/UserBookings";
import UserAccountEdit from "./pages/user/UserAccountEdit";
import DeleteUser from "./pages/user/DeleteUser";


// Loaders Pages Routes
import SuccessLoader from "./pages/loaders/SuccessLoader";
import ContactUsLoader from "./pages/loaders/ContactUsLoader";
import ReviewLoader from "./pages/loaders/ReviewLoader";
import BookingLoader from "./pages/loaders/BookingLoader";
import DeleteLoader from "./pages/loaders/DeleteLoader";
import AccountDelete from "./pages/loaders/AccountDelete";



// UserContext Pages
import Admin from "./components/userContext/Admin";
import PrivateRoute from "./components/userContext/PrivateRoute";
import { useUser } from "./components/userContext/userContext";


export default function App() {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Simulate a loading state only for Home and Admin Dashboard pages
  useEffect(() => {
    const targetPaths = ["/", "/admin"];
    if (targetPaths.includes(location.pathname)) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

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
        <div className="loading-page flex flex-col justify-center gap-6 items-center h-screen">
          <DotLottieReact
            src="https://lottie.host/e32980de-2d5a-4f0c-96ae-853d398fecab/qJq4lBxhtz.lottie"
            loop
            autoplay
            className="w-40 h-40"
          />
          <p className="uppercase text-lg font-bold text-gray-900 animate-pulse py-2">
            Loading...
          </p>
        </div>
      ) : (
        
        <Routes>
          <Route path="/" element={<Home />} />
          

           {/* Hotel Pages Routes */}
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
            path="/booking/:bookingId"
            element={
              <PrivateRoute>
                <ConfirmationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserHome />
              </PrivateRoute>
            }
          />
          <Route path="/user/:id/account" element={<UserAccount />} />
          <Route path="/user/:id/wishlists" element={<UserWishLists />} />
          <Route path="/user/:id/bookings" element={<UserBookings />} />

          {/* Authentication Pages Routes */}
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/user/logout" element={<Logout />} />

          {/* Authentication Success loaders Routes */}
          <Route
            path="/user/register/successfully"
            element={<AuthSuccessPopup />}
          />
          <Route path="/user/login/confirmed" element={<LoginLoader />} />
          <Route path="/user/:id/account/edit" element={<UserAccountEdit />} />
          <Route path="/user/:id/account/delete" element={<DeleteUser />} />


             {/* loaders Routes */}
          <Route
          path="/delete/successfully"
          element={
            <PrivateRoute>
                <Admin>
              <DeleteLoader />
                </Admin>
              </PrivateRoute>
          } />

          <Route
            path="/account/deleted/successfully"
            element={
              <PrivateRoute>
            <AccountDelete />
              </PrivateRoute>
            }
          />

          <Route
          path="/create/successfully" 
          element={
            <PrivateRoute>
                <Admin>
          <SuccessLoader />
                </Admin>
              </PrivateRoute>
          } />

          <Route
          path="/edit/successfully" 
          element={
            <PrivateRoute>
                <Admin>
          <SuccessLoader />
                </Admin>
              </PrivateRoute>
          } />

          <Route
          path="/review/done" 
          element={
            <PrivateRoute>
          <ReviewLoader />
            </PrivateRoute>
          } />

          <Route
          path="/booking/done" 
          element={
            <PrivateRoute>
          <BookingLoader />
            </PrivateRoute>
          } />

          <Route
          path="/contact/confirmed" 
          element={
            <PrivateRoute>
          <ContactUsLoader />
            </PrivateRoute>
          } />



          {/* Admin Pages Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin>
                  <AdminHome />
                </Admin>
              </PrivateRoute>
            }
          >
            <Route path="users" element={<AdminUser />} />
            <Route path="hotels" element={<AdminHotel />} />
            <Route path="bookings" element={<AdminBooking />} />
            <Route path="contacts" element={<AdminContact />} />
            <Route path="new-hotel" element={<CreateHotel />} />
            <Route path="hotel-details/:id/edit" element={<EditHotel />} />
            <Route path="hotel/:id/delete" element={<DeleteHotel />} />
            <Route path="new-blog" element={<CreateBlog />} />
          </Route>


          {/* Blogs Pages Routes */}
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<ShowBlog />} />
          <Route
            path="/blog/:id/edit"
            element={
              <PrivateRoute>
                <Admin>
                  <EditBlog />
                </Admin>
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/:id/delete"
            element={
              <PrivateRoute>
                <Admin>
                  <DeleteBlog />
                </Admin>
              </PrivateRoute>
            }
          />


            {/* Footer Page Route */}
          <Route
            path="/policies"
            element={<TermsAndConditions />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
          path="/contact" 
          element={
            <PrivateRoute>
          <Contact />
            </PrivateRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<AllBlogs />} />

            {/* 404 Page Not Found Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
}
