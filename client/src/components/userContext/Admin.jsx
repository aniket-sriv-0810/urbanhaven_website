import React from "react";
import { useUser } from "./userContext";
import PageNotFound from "../../pages/loaders/PageNotFound";


const Admin = ({ children }) => {
  const { user } = useUser();

  // Check if user is not logged in or not an admin
  if (!user || user.role !== "admin") {
    return <PageNotFound />; // Redirect to 404 page
  }

  return children;
};

export default Admin;
