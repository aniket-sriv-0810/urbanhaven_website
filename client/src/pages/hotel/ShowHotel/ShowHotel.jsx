import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from '../../../components/Navbars/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import ShowHotelHeading from '../../../components/HotelHeading/ShowHotelHeading';
import HotelImage from '../../../components/HotelImage/HotelImage';
import HotelDetails from '../../../components/ShowHotelDetails/ShowHotelDetails';
import ImageGallery from '../../../components/ImageGallery/ImageGallery';
import Amenities from '../../../components/Amenities/Ammenties';
import MapLocation from '../../../components/MapLocation/MapLocation';
import Policies from '../../../components/Policies/Policies';
import FAQs from '../../../components/FAQs/FAQs';
import HotelReviews from '../../../components/HotelReviews/HotelReviews';
import Review from '../../../components/Review/Review';

const ShowHotel = () => {
  const { id } = useParams();
  const [showMyHotel, setShowMyHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1500, easing: "ease-in-out", mirror: true, once: false });
  }, []);

  console.log("Hotel ID : " , id);
  const fetchHotelDetails = async () => {
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/hotel/${id}`,
       { withCredentials: true });
      console.log(response.data);
      
      if(response.status == 200){

        setShowMyHotel(response.data.data.showHotel);
        setReviews(response.data.data.allReviews);
        setReviewCount(response.data.data.totalReviews);
        setAvgRating(response.data.data.avgRating);
        
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  if (loading) return <p>Loading hotel details...</p>;
  

  return (
    <>
      <div className='bg-gradient-to-r from-slate-600 to-slate-800'>
        <Navbar />
      </div>
      <div className=" overflow-hidden">
        <ShowHotelHeading />
        {showMyHotel ? <HotelImage image={showMyHotel.image} title={showMyHotel.title} /> : <p>Hotel Image not available</p>}

        <ImageGallery />
        <HotelDetails hotel={showMyHotel} avgRating={avgRating} reviewCount={reviewCount} />
        <Amenities />
        <div className='w-[85%] l m-auto'>
        <MapLocation hotel={showMyHotel} />
        </div>
        <Policies />
        <FAQs />
        <Review/>
        <div className='w-full'>
        <HotelReviews reviews={reviews} />
        </div>

      </div>
      <Footer />
    </>
  );
};

export default ShowHotel;
