import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from '../../../components/Navbars/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import ShowHotelHeading from '../../../components/Hotels/Show-Hotel/ShowHotelHeading';
import HotelImage from '../../../components/Hotels/Show-Hotel/HotelImage';
import ShowHotelDetails from '../../../components/ShowHotelDetails/ShowHotelDetails';
import ImageGallery from '../../../components/Hotels/Show-Hotel/ImageGallery/ImageGallery';
import Amenities from '../../../components/Hotels/Show-Hotel/Amenities/Ammenties';
import MapLocation from '../../../components/Hotels/Show-Hotel/MapLocation/MapLocation';
import Policies from '../../../components/Hotels/Show-Hotel/Policies/Policies';
import FAQs from '../../../components/FAQs/FAQs';
import HotelReviews from '../../../components/Hotels/Show-Hotel/HotelReviews/HotelReviews';
import Review from '../../../components/Review/Review';
import SkeletonCard from "../../../components/LoadingSkeleton/SkeletonCard";
import BookingBtn from '../../../components/Hotels/Show-Hotel/BookingBtn/BookingBtn';
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

  if (loading) return <div className='flex justify-center items-center mt-20'><SkeletonCard/></div>


  return (
    <>
      <div className='bg-gradient-to-r from-slate-600 to-slate-800'>
        <Navbar />
      </div>
      <div className=" overflow-hidden">
      <div className='my-20'>
        <ShowHotelHeading />
      </div>
      <div className='my-40'>
        {showMyHotel ? <HotelImage image={showMyHotel.image} title={showMyHotel.title} /> : <div><SkeletonCard/></div>}
      </div>

<div className='my-20'>
        <ImageGallery />
</div>
<div className='my-40'>
        <ShowHotelDetails hotel={showMyHotel} avgRating={avgRating} reviewCount={reviewCount} />
</div>
<div className='my-60'>
        <Amenities />
</div>
        <div className='w-[85%]  m-auto my-60'>
        <MapLocation hotel={showMyHotel} />
        </div>
        <BookingBtn hotel={showMyHotel}/>
        <div className='my-60'>
        <Policies />
        </div>
        <div className='my-40'>
        <FAQs />
        </div>
        <div className='my-40'>
        <Review/>
        </div>
        <div className='w-full my-60'>
        <HotelReviews reviews={reviews} />
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </>
  );
};

export default ShowHotel;
