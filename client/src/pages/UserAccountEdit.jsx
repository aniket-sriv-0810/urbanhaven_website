import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const UserAccountEdit = () => {
   const navigate = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({
     name:"",
     username:"",
     phone:"",
     email:"",
    });
    const [image, setImage] = useState(null);
    const [orgImage , setOrgImg] = useState(null);

  // Fetch the current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/${id}/account`,{
            withCredentials:true,
          },
        );
        console.log("edit =>" , response.data);
        
        setOrgImg(response.data.data.userInfo.image);
        setUserData(response.data.data.userInfo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("username", userData.username);
      formData.append("phone", userData.phone);
      formData.append("email", userData.email);

      if (image) {
        formData.append("image", image);
      }
  
      try {
        const response = await axios.put(
          `http://localhost:8000/api/v1/user/${id}/account/edit`,
          formData,{
            withCredentials:true,
          },
        );
  
        console.log("user updated:", response.data.data.updatedUser);
        navigate(`/user/${id}/account`)
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
  return (
    
   <>
   <img src={orgImage} alt={userData.name}  className='w-40 rounded-full m-auto border-2 border-black' />
   <form
   className="border-gray-500 border-2 w-max m-auto p-5 rounded-lg"
   onSubmit={handleSubmit}
 >
   <input
     type="text"
     required
     name="name"
     className="border-gray-500 border-2"
     onChange={handleChange}
     value={userData.name}
   ></input>
   <br />
   <input
     type="text"
     required
     name="username"
     className="border-gray-500 border-2"
     onChange={handleChange}
     value={userData.username}
   ></input>
   <br />
   <input
     type="number"
     required
     name="phone"
     className="border-gray-500 border-2"
     onChange={handleChange}
     value={userData.phone}
   ></input>
   <br />
   <input
     type="email"
     required
     name="email"
     className="border-gray-500 border-2"
     onChange={handleChange}
     value={userData.email}
   ></input>
   <br />
   <br />
   <input type="file" name="image" onChange={handleImageChange} />
   <br />
   <br /> <br />
   <button type="submit" className="bg-green-500 px-4 py-2 rounded-2xl">
     Save Details
   </button>
 </form>

   </>
  )
}

export default UserAccountEdit
