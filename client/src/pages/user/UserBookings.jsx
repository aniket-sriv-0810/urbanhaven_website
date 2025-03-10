import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import UserBookingCard from "../../components/User/UserBooking/UserBookingCard";
import LoadingMessage from "../../components/User/UserBooking/LoadingMessage";
import ErrorMessage from "../../components/User/UserBooking/ErrorMessage";

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
          setBookings(response.data.data.showBookings.filter(booking => booking.status !== "Cancelled"));
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
    setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== bookingId));
  };

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <UserNavbar />
      <div className="px-6 py-10 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">My Bookings</h2>
        
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No active bookings.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <UserBookingCard key={booking._id} booking={booking} onCancel={handleCancel} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserBookings;
