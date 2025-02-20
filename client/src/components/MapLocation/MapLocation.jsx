import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FaMapMarkerAlt } from "react-icons/fa";

const MapLocation = ({ hotel }) => {
  const [coordinates, setCoordinates] = useState([28.7041, 77.1025]); // Default coordinates (New Delhi)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (hotel) {
        const locationQuery = `${hotel.city}, ${hotel.state}, ${hotel.country}`;
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: locationQuery,
              format: 'json',
            },
          });

          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setCoordinates([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error('No coordinates found for the location.');
            setError(true);
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
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
    <div className="bg-gray-300 rounded-2xl shadow-lg shadow-gray-400 overflow-hidden ">
      <h2 className="text-xl flex items-center justify-center gap-3 font-bold text-center text-black py-4">
       <FaMapMarkerAlt className='text-red-500'/> Our Hotel Location
      </h2>
      <MapContainer
        center={coordinates}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[300px] sm:h-[400px] md:h-[500px] w-full "
      >
        <TileLayer
          attribution='&copy; UrbanHaven Hotels'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} >
          <Popup >
            <b>{hotel?.title || 'Hotel Name Unavailable'}</b> <br />
            {hotel?.city || 'City'}, {hotel?.state || 'State'}, {hotel?.country || 'Country'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLocation;
