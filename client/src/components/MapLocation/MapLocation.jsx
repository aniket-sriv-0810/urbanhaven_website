import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapLocation = ({ hotel }) => {
  const [coordinates, setCoordinates] = useState([28.7041, 77.1025]); // Default coordinates of New Delhi
  const [loading, setLoading] = useState(true);

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
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoordinates();
  }, [hotel]);

  if (loading) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>
          <b>{hotel.title}</b> <br />
          {hotel.city}, {hotel.state}, {hotel.country}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLocation;
