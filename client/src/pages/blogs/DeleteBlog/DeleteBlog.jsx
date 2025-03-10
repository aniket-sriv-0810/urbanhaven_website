
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../../../components/LoadingSkeleton/SkeletonCard";

const DeleteBlog = () => {
      const { id } = useParams();
      const navigate = useNavigate();
        const deleteBlog = async () => {
          try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/admin/blog/${id}/delete`, {
              withCredentials: true,
            });
      
            if (response.status === 200) {
                navigate("/delete/successfully");
            }
          } catch (error) {
            console.error("Failed to delete Blog ", error);
          }
        };
        useEffect( () => {
            deleteBlog()
        } ,[])
  return (
   <>
   <h1 className="flex justify-center items-center mt-10"><SkeletonCard/></h1>
   </>
  )
}

export default DeleteBlog
