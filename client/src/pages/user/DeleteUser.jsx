import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../components/userContext/userContext";
import SkeletonCard from "../../components/LoadingSkeleton/SkeletonCard";

const DeleteUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setUser } = useUser();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        let response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/v1/user/${id}/account/delete`,
          { withCredentials: true }
        );
        // Clear user session from frontend
        setUser(null);
        localStorage.removeItem("user");

        // Navigate to success page
        navigate("/");
      } catch (error) {
        console.error("Error in deleting user:", error);
      }
    };

    deleteUser();
  }, [id, navigate, setUser]);

  return (
    <div className="flex justify-center items-center mt-10">
      <SkeletonCard />
    </div>
  );
};

export default DeleteUser;
