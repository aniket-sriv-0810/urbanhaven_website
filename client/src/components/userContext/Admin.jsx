import React from "react";
import { useUser } from "./userContext";
import PageNotFound from "../../pages/loaders/PageNotFound";
import AdminHome from "../../layout/AdminHome";

const Admin = () => {
  const { user } = useUser();

  // Check if user is not logged in or not an admin
  if (!user || user.role !== "admin") {
    return <PageNotFound />; // Redirect to 404 page
  }

  return <AdminHome />; // Render the admin panel if user is an admin
};

export default Admin;
