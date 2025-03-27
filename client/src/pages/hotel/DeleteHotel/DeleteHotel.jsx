import React , {useState} from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonCard from "../../../components/LoadingSkeleton/SkeletonCard";
import ErrorPopup from '../../../components/PopUps/ErrorPopup/ErrorPopup';
const DeleteHotel = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [error, setError] = useState("");
    useEffect(() => {
        const deleteHotel = async() => {
            try {
              let response = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/admin/hotel/${id}/delete` ,{
                withCredentials: true,
              });
             
              navigate('/admin');
            } catch (error) {
             
              setError(error.response?.data?.message || "Failed to delete the Hotel.");
            }
          }
          deleteHotel();
    }, []);

  return (
    <>
    {error && <ErrorPopup message={error} onClose={() => setError("")} />}
    <h1 className='flex justify-center items-center mt-10'><SkeletonCard/></h1>
    </>
  )
}

export default DeleteHotel
