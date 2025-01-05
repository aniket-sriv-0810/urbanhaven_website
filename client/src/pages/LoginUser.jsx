import axios from "axios";
import React , { useRef } from "react";
import { useState } from "react";
import { useNavigate, useLocation , NavLink } from "react-router-dom";
import { useUser } from "../components/userContext/userContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation(); //captures the current location
  const { setUser } = useUser();
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: ""
  });
     // Ref to access all input elements in the form
  const inputRefs = {
    username: useRef(),
    password: useRef(),
  };
  const handleInputChange = (e) =>{
    const { name, value } = e.target;
      setLoginUser({...loginUser , [name] : value})
      // Apply styles dynamically for all inputs
  if (inputRefs[name].current) {
    if (value) {
      inputRefs[name].current.style.color = 'white';  // Green text color for filled input
      inputRefs[name].current.style.backgroundColor = '#5454544f';  // Light green background
    } else {
      inputRefs[name].current.style.color = 'white';  // Red text color for empty input
      inputRefs[name].current.style.backgroundColor = '#5454544f';  // Light red background
    }
  }
};

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(loginUser);
    const dataSent = {
      username: loginUser.username,
      password: loginUser.password
    };

    try {
      let response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        dataSent,
        { withCredentials: true }
      );
      console.log(response.data.message);
      const loginData = response.data.data.loggedInUser;
      console.log(loginData);

      if (response.status === 200) {
        setLoginUser({
          username: "",
          password: ""
        });
        setUser(response.data.data.loggedInUser);
        localStorage.setItem("user", JSON.stringify(loginData))
        const redirectPath = location.state?.from?.pathname || "/";
        toast.success("Logged in Successfully !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setTimeout(() => {
          navigate(redirectPath);
        }, 3000); // Delay navigation
      } else {
        console.error("User cannot be logged in");
      }
    } catch (error) {
      console.error("Failed to Log in the new user", error);
    }
  };
  const inputStyling= "border border-gray-300 rounded-xl p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#5454544f] placeholder:text-center placeholder:capitalize placeholder:text-white"
 


  return (
    <>
    <div className="bg-[url('/assets/bg.jpg')] bg-cover  flex flex-col justify-center items-center flex-wrap bg-purple-200 min-h-screen gap-8">
    <h1 className='text-white text-3xl font-semibold  mb-4'>Log in to your Account</h1>
    <div className='flex flex-col border-2 border-white rounded-xl p-3 bg-[#212125]'>
    <h1 className='text-white text-center font-bold text-2xl  mt-3'>Verify Your Credentials</h1>
      <form
        className="p-10 w-[25rem] rounded-lg flex flex-col gap-y-4 -mt-3"
        onSubmit={handleSubmitForm}
      >
        
        <input
          type="text"
          placeholder="enter username"
          required
          name="username"
          ref={inputRefs.username}
          className={inputStyling}
          onChange={handleInputChange}
          value={loginUser.username}
        ></input>

        <input
          type="password"
          placeholder="enter strong password "
          required
          name="password"
          ref={inputRefs.password}
          className={inputStyling}
          onChange={handleInputChange}
          value={loginUser.password}
        ></input>
        <div className='flex justify-center mt-3 text-md text-gray-400'>Does not have an account ? &nbsp;<NavLink to="/user/register"><span className='text-cyan-300'>Create Account</span></NavLink></div>
        <button type="submit" className="border-gray-500 border-2 mt-6 bg-green-600 px-2 py-2 text-white rounded-xl">
          Log in 
        </button>
      </form>
      </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default LoginUser;
