import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "../../../components/userContext/userContext";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";
import { FaUser } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); 
  const inputRefs = { username: useRef(), password: useRef() };

  const validateForm = () => {
    let errors = {};
    if (!loginUser.username) errors.username = "Username is required!";
    if (!loginUser.password) errors.password = "Password is required!";
    else if (loginUser.password.length < 6)
      errors.password = "Invalid password credentials!";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });

    if (inputRefs[name]?.current) {
      inputRefs[name].current.style.color = value ? "white" : "black";
      inputRefs[name].current.style.textAlign = "center";
      inputRefs[name].current.style.backgroundColor = "#5454544f";
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/user/login`,
        loginUser,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const userData = response.data.data.loggedInUser;
        setLoginUser({ username: "", password: "" });
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/user/register/successfully");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.details) {
        const backendErrors = error.response.data.details.reduce((acc, msg) => {
          if (msg.toLowerCase().includes("username")) acc.username = msg;
          else if (msg.toLowerCase().includes("password")) acc.password = msg;
          else acc.global = msg;
          return acc;
        }, {});
        setFormErrors(backendErrors);
      } else {
        setFormErrors({ global: error.response?.data?.message || "An error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-y-4 lg:p-5" onSubmit={handleSubmitForm}>
      {formErrors.global && <ErrorMessage message={formErrors.global} />}
      
      <InputField
        type="text"
        name="username"
        placeholder="please enter your username"
        value={loginUser.username}
        onChange={handleInputChange}
        error={formErrors.username}
        icon={<FaUser />}
        ref={inputRefs.username || inputRefs.password}
      />
      {formErrors.username && <p className="text-red-500 text-sm text-center">{formErrors.username}</p>}
      
      <InputField
        type="password"
        name="password"
        placeholder="please enter your password"
        value={loginUser.password}
        onChange={handleInputChange}
        error={formErrors.password || formErrors.username}
        icon={<BsShieldLockFill />}
        ref={inputRefs.password || inputRefs.username}
      />
      {formErrors.password && <p className="text-red-500 text-sm mt-2 text-center">{formErrors.password}</p>}

      <div className="text-center text-gray-400 mt-2 text-sm sm:text-base">
        <span>Don’t have an account? </span>
        <NavLink to="/user/register" className="text-sky-500 hover:underline">
          Register
        </NavLink>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full border-gray-500 border-2 font-semibold px-4 py-2 text-white rounded-xl mt-4 ${
          isLoading ? "bg-gray-800 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        } flex items-center justify-center gap-2`}
      >
        {isLoading ? (
          <>
            <span className="animate-pulse flex items-center gap-3 text-green-400">
            <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            Verifying...</span>
          </>
        ) : (
          "Verify Now"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
