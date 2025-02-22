import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserNavbar from "../components/Navbars/UserNavbar/UserNavbar";

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
                    `http://localhost:8000/v1/user/${id}/account/bookings`,
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg font-semibold text-gray-700">Loading Bookings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <>
            <UserNavbar />
            <div className="px-6 py-10 bg-gray-50 min-h-screen">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">My Bookings</h2>
                {bookings.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-all">
                                {/* Image with fallback */}
                                <img
                                    src={booking.hotelDetails?.image || "https://via.placeholder.com/300"}
                                    alt={booking.hotelDetails?.title || "Hotel"}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <h3 className="text-xl font-semibold mt-3 text-gray-900">
                                    {booking.hotelDetails?.title || "No Title Available"}
                                </h3>
                                <p className="text-gray-900 font-bold mt-1">
                                    ₹{booking.hotelDetails?.price || "N/A"} per night
                                </p>
                                <p className="text-gray-600 mt-1">
                                    Check-in:{" "}
                                    <span className="font-semibold">{new Date(booking.checkInDate).toLocaleDateString("en-IN")}</span> → 
                                    Check-out:{" "}
                                    <span className="font-semibold">{new Date(booking.checkOutDate).toLocaleDateString("en-IN")}</span>
                                </p>
                                <p className="text-gray-700 mt-1">
                                    Rooms: {booking.room} | Adults: {booking.adultCount} | Infants: {booking.infantCount}
                                </p>
                                {/* Status Badge */}
                                <span
                                    className={`mt-3 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                                        booking.status === "Confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {booking.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg font-semibold text-gray-700">No bookings found.</p>
                )}
            </div>
        </>
    );
};

export default UserBookings;
