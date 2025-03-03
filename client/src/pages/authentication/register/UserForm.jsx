import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import { validateForm } from "./validation";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import { useUser } from "../../../components/userContext/userContext";

const UserForm = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const inputRefs = {
    name: useRef(),
    username: useRef(),
    phone: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (inputRefs[name].current) {
      inputRefs[name].current.style.color = value ? "white" : "black";
      inputRefs[name].current.style.textAlign = "center";
      inputRefs[name].current.style.backgroundColor = "#5454544f";
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(newUser);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true); // Start loading animation

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/user/register`,
        newUser,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data.data.registerNewUser);
        // Store a flag for guided tour
        localStorage.setItem("startTour", "true");
        navigate("/user/register/successfully");
      }
    } catch (error) {
      if (error.response && error.response.data.details) {
        const backendErrors = error.response.data.details.reduce(
          (acc, message) => {
            if (message.includes("Name")) acc.name = message;
            if (message.includes("Username")) acc.username = message;
            if (message.includes("Phone")) acc.phone = message;
            if (message.includes("Email")) acc.email = message;
            if (message.includes("Password")) acc.password = message;
            return acc;
          },
          {}
        );
        setFormErrors(backendErrors);
      } else {
        setFormErrors({ global: "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <form
      className="flex flex-col gap-y-4 md:p-5 lg:p-5"
      onSubmit={handleSubmitForm}
    >
      <InputField
        Icon={FaUser}
        type="text"
        name="name"
        placeholder="please enter your name"
        value={newUser.name}
        onChange={handleInputChange}
        error={formErrors.name}
        inputRef={inputRefs.name}
      />
      <InputField
        Icon={BiSolidUserDetail}
        type="text"
        name="username"
        placeholder="please set your username"
        value={newUser.username}
        onChange={handleInputChange}
        error={formErrors.username}
        inputRef={inputRefs.username}
      />
      <InputField
        Icon={FaPhoneAlt}
        type="number"
        name="phone"
        placeholder="please enter contact number"
        value={newUser.phone}
        onChange={handleInputChange}
        error={formErrors.phone}
        inputRef={inputRefs.phone}
      />
      <InputField
        Icon={MdEmail}
        type="email"
        name="email"
        placeholder="please enter your email id"
        value={newUser.email}
        onChange={handleInputChange}
        error={formErrors.email}
        inputRef={inputRefs.email}
      />
      <InputField
        Icon={BsShieldLockFill}
        type="password"
        name="password"
        placeholder="please set a 6 digit strong password"
        value={newUser.password}
        onChange={handleInputChange}
        error={formErrors.password}
        inputRef={inputRefs.password}
      />
<div className="flex gap-2  justify-evenly"><input type="checkbox" id="checkbox" className="accent-green-500 w-5 hover:cursor-pointer" required/><label htmlFor="checkbox" className="text-gray-400"> I agree to all the <span onClick={() => navigate('/terms-and-conditions')} className=" text-cyan-300 hover:cursor-pointer hover:text-blue-600 "> terms and conditions </span> </label></div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full border-gray-500 border-2 font-semibold px-4 py-2 text-white rounded-xl mt-4 ${
          isLoading
            ? "bg-gray-800 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        } flex items-center justify-center gap-2`}
      >
        {isLoading ? (
          <>
            <span className="animate-pulse font-semibold text-green-400 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </span>
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default UserForm;
