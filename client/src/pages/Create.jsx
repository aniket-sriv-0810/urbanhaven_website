import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Create = () => {

  const navigate = useNavigate();
  const [newHotel, setNewHotel] = useState({
    title: "",
    description: "",
    price: "",
    image:"https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
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
    setNewHotel({ ...newHotel, image: e.target.files[0] });
  };

  const handleSubmitForm = async(e) => {
    e.preventDefault();
    console.log(newHotel);
    const formData = new FormData();
    formData.append("title", newHotel.title);
    formData.append("description", newHotel.description);
    formData.append("price", newHotel.price);
    formData.append("city", newHotel.city);
    formData.append("state", newHotel.state);
    formData.append("country", newHotel.country);
    if (newHotel.image) {
      formData.append("image", newHotel.image);
    }
    try {
      const response = await axios.post("http://localhost:8000/api/v1/new" ,formData);
      if(response.status === 200){
        setNewHotel({
          title: "",
          description: "",
          price: "",
          image:null,
          city: "",
          state: "",
          country: ""
        });
        navigate('/')
      }
      else{
        console.error("Error occurred");

        navigate('/api/v1/new');
      }
      console.log(response.data);
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
        <button type="submit" className="border-gray-500 border-2">
          Register
        </button>
      </form>
    </>
  );
};

export default Create;
