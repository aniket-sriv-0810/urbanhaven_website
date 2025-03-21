import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useParams } from "react-router-dom";
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import UserBookingCard from "../../components/User/UserBooking/UserBookingCard";
import ErrorMessage from "../../components/User/UserBooking/ErrorMessage";
import NotAvailable from "../loaders/NotAvailable";
import SkeletonList from "../../components/LoadingSkeleton/SkeletonList";
import ErrorPopup from "../../components/PopUps/ErrorPopup/ErrorPopup";
const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/user/${id}/account/bookings`,
          { withCredentials: true }
        );

        console.log("Fetched Bookings:", response.data);

        if (response.data && Array.isArray(response.data.data.showBookings)) {
          // Filter out cancelled bookings on initial fetch
          setBookings(
            response.data.data.showBookings.filter(
              (booking) => booking.status !== "Cancelled"
            )
          );
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  // Function to remove a cancelled booking from the list
  const handleCancel = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking._id !== bookingId)
    );
  };
  useEffect(() => {
    AOS.init({
      offset: 60, // Start animation after scrolling 100px
      duration: 1500, // Animation duration
      easing: "ease-in-out", // Smooth effect
      mirror: true,
      once: false, // Animation repeats on scroll
    });
  }, []);
  if (error) return <div className="text-center ">
  {error && <ErrorPopup message={error} onClose={() => setError("")} />} 
 </div>

  return (
    <>
      <UserNavbar />
      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-700">
          <SkeletonList />
        </div>
      ) : (
        <div className="py-10 bg-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            My Bookings
          </h2>

          {bookings.length === 0 ? (
            
            <div className=" w-max m-auto text-lg font-semibold text-gray-700">
              <NotAvailable
                content={"No Hotel Found"}
                tagline={
                  " Oops! It looks like you have not booked any hotel yet . Why not explore our amazing collection and book our amazing hotels ?"
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:justify-evenly w-max m-auto items-center md:grid-cols-2  lg:grid-cols-3  gap-16 mt-10 py-10 mb-10 ">
              {bookings.map((booking) => (
                <UserBookingCard
                  key={booking._id}
                  booking={booking}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserBookings;
