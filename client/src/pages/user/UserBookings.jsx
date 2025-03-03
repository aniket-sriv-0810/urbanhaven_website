import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserNavbar from "../../components/Navbars/UserNavbar/UserNavbar";
import UserBookingList from "../../components/User/UserBooking/UserBookingList";
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
          setBookings(response.data.data.showBookings);
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

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <UserNavbar />
      <div className="px-6 py-10 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">My Bookings</h2>
        <UserBookingList bookings={bookings} />
      </div>
    </>
  );
};

export default UserBookings;
