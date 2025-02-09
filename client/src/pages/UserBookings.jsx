import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/v1/user/${id}/account/bookings`
                    ,{withCredentials: true}
                );
                console.log(response.data.data);
                
                setBookings(response.data.data.showBookings); // Accessing booking details
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings ? bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking._id} className="bg-white p-4 shadow-lg rounded-xl">
                            <img src={booking.hotelDetails.image} alt="Hotel" className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-lg font-semibold mt-3">{booking.hotelDetails.title}</h3>
                            <p className="text-gray-600">{booking.hotelDetails.description}</p>
                            <p className="mt-2 text-gray-900 font-bold">₹{booking.hotelDetails.price} per night</p>
                            <p className="text-gray-600">
                            Check-in: {new Date(booking.checkInDate).toLocaleDateString("en-IN")} → Check-out: {new Date(booking.checkOutDate).toLocaleDateString("en-IN")}</p>
                            <p className="text-gray-700">
                                Rooms: {booking.room} | Adults: {booking.adultCount} | Infants: {booking.infantCount}
                            </p>
                            <p className={`font-semibold ${booking.status === "Confirmed" ? "text-green-600" : "text-red-500"}`}>
                                {booking.status}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                ) : null}
            </div>
        </div>
    );
};

export default UserBookings;
