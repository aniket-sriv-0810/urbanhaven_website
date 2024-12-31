import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Create = () => {

  const navigate = useNavigate();
  const [image , setImage] = useState(null);
  const [newHotel, setNewHotel] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: ""
  });

  // storing the input values
  const handleInputChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    console.log(e.target.name ," => " , e.target.value);
    
    setNewHotel({ ...newHotel, [inputName]: inputValue });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImage( e.target.files[0] );
  };



  const handleSubmitForm = async(e) => {
    e.preventDefault();
    console.log(newHotel , image);
    const formData = new FormData();
    formData.append("title", newHotel.title);
    formData.append("description", newHotel.description);
    formData.append("price", newHotel.price);
    formData.append("city", newHotel.city);
    formData.append("state", newHotel.state);
    formData.append("country", newHotel.country);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/admin/new-hotel" ,formData, {
        withCredentials:true
      });
      if(response.status === 200){
        setNewHotel({
          title: "",
          description: "",
          price: "",
          city: "",
          state: "",
          country: ""
        });
        setImage(null);
        navigate('/admin')
      }
      else{
        console.error("Error occurred");
      }
      console.log("Final Response sent => ", response.data);
    }
    catch (error) {
      console.error("Hotel Creation error: " + error);
    }
  };
  return (
    <>
      <h1>This is a Create Page</h1>
      <form
        className="border-gray-500 border-2 w-max m-auto p-5 rounded-lg"
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          placeholder="enter title"
          required
          name="title"
          className="border-gray-500 border-2"
          onChange={handleInputChange}
          value={newHotel.title}
        ></input>
        <br />
        <input
          type="text"
          placeholder="enter description"
          required
          name="description"
          className="border-gray-500 border-2"
          onChange={handleInputChange}
          value={newHotel.description}
        ></input>
        <br />
        <input
          type="number"
          placeholder="enter price "
          required
          name="price"
          className="border-gray-500 border-2"
          onChange={handleInputChange}
          value={newHotel.price}
        ></input>
        <br />
        <input type="file" name="image" onChange={handleFileChange} />
        <br />

        <input
          type="text"
          placeholder="enter city"
          required
          name="city"
          className="border-gray-500 border-2"
          onChange={handleInputChange}
          value={newHotel.city}
        ></input>
        <br />
        <input
          type="text"
          placeholder="enter state"
          required
          name="state"
          className="border-gray-500 border-2"
          onChange={handleInputChange}
          value={newHotel.state}
        ></input>
        <br />
        <input
          type="text"
          placeholder="enter country"
          required
          name="country"
          className="border-gray-500 border-2"
          onChange={handleInputChange}
          value={newHotel.country}
        ></input>
        <br />
        <br /> <br />
        <br />
        <button type="submit" className=" w-max p-3 bg-green-600 text-white rounded-xl">
          Register
        </button>
        
      </form>
    </>
  );
};

export default Create;
