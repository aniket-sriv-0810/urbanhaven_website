
import React, { useEffect , useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../../../components/LoadingSkeleton/SkeletonCard";
import ErrorPopup from "../../../components/PopUps/ErrorPopup/ErrorPopup";
const DeleteBlog = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const [error, setError] = useState("");
        const deleteBlog = async () => {
          try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/admin/blog/${id}/delete`, {
              withCredentials: true,
            });
      
            if (response.status === 200) {
                navigate("/delete/successfully");
            }
          } catch (error) {
            
            setError(error.response?.data?.message || "Failed to delete the blog.");
          }
        };
        useEffect( () => {
            deleteBlog()
        } ,[])
  return (
   <>
   {error && <ErrorPopup message={error} onClose={() => setError("")} />}
   <h1 className="flex justify-center items-center mt-10"><SkeletonCard/></h1>
   </>
  )
}

export default DeleteBlog
