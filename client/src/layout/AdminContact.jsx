import axios from "axios";
import React, { useEffect, useState } from "react";
import ContactTable from "../components/Admin/AdminContact/ContactTable";
import SkeletonTable from "../components/LoadingSkeleton/SkeletonTable";
const AdminContact = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/admin/contacts`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setContactDetails(response.data.data.contactData);
      }
    } catch (error) {
      console.error("Failed to get contact details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center pt-5 mb-6 text-gray-800">
        Contact Messages
      </h1>

      {loading ? (
        <div className="text-center text-gray-700">
  <SkeletonTable />
</div>

      ) : contactDetails.length > 0 ? (
        <ContactTable contacts={contactDetails} />
      ) : (
        <p className="text-center text-red-500 mt-6">No Contact Details Found!</p>
      )}
    </div>
  );
};

export default AdminContact;
