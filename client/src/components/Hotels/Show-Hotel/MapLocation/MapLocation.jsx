import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";

// Import marker images explicitly
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Define custom icon
const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapLocation = ({ hotel }) => {
  const [coordinates, setCoordinates] = useState([28.7041, 77.1025]); // Default coordinates (New Delhi)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (hotel) {
        const locationQuery = `${hotel.city}, ${hotel.state}, ${hotel.country}`;
        try {
          const response = await axios.get(`${import.meta.env.VITE_MAP_URL}`, {
            params: {
              q: locationQuery,
              format: "json",
            },
          });

          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setCoordinates([parseFloat(lat), parseFloat(lon)]);
          } else {

            setError(true);
          }
        } catch (error) {

          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoordinates();
  }, [hotel]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-600">Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 w-full bg-red-100 text-red-600 rounded-md">
        <p>Error loading map. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-600 rounded-2xl shadow-lg shadow-gray-400 overflow-hidden">
      <h2 className="text-xl flex items-center justify-center gap-3 font-bold text-center text-white py-4">
        <FaMapMarkerAlt className="text-red-500 text-2xl" /> Our Hotel Location
      </h2>
      <MapContainer
        center={coordinates}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[300px] sm:h-[400px] md:h-[500px] w-full"
      >
        <TileLayer
          attribution="&copy; UrbanHaven Hotels"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} icon={customMarkerIcon}>
          <Popup>
            <b>{hotel?.title || "Hotel Name Unavailable"}</b> <br />
            {hotel?.city || "City"}, {hotel?.state || "State"}, {hotel?.country || "Country"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLocation;
