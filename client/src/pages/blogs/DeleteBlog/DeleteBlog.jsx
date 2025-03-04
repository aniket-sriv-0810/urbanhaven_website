
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteBlog = () => {
      const { id } = useParams();
      const navigate = useNavigate();
        const deleteBlog = async () => {
          try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/navigate/blog/${id}/delete`, {
              withCredentials: true,
            });
      
            if (response.status === 200) {
                navigate("/all-blogs");
              alert("Blog deleted successfully!");
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
   <h1>hotel deleted !</h1>
   </>
  )
}

export default DeleteBlog
