import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const fetchAuthStatus = async () => {
    try {
      // Fetch authentication status from the server
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/user/auth`, 
        {
        withCredentials: true,
      }
    );

      if (response.data.isAuthenticated) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching authentication status:", error);
      setUser(null); // Handle errors by clearing user data
    }
  };


  useEffect(() => {
    console.log("Current user state:", user); // Debugging Log
      // Fetch only if user is not already in local state
      if (!user) {
        fetchAuthStatus();
      }

  }, [ user]);

  useEffect(() => {
    // Sync user state with localStorage whenever it changes
    if (user) {
      console.log("User api changed =>" , user._id);
      console.log("User api changed =>" , user.name);
      console.log("User api changed =>" , user.username);
      console.log("User api changed =>" , user.image);
      console.log("User api changed =>" , user.phone);
      console.log("User api changed =>" , user.role);
      console.log("User api changed =>" , user.createdAt);
      console.log("User logged in:", user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("User logged out");
      localStorage.removeItem("user");
    }
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);