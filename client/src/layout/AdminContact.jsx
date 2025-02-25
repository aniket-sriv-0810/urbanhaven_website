import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDone, MdOutlinePendingActions } from "react-icons/md";

const AdminContact = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/admin/contacts",
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
        <p className="text-center text-gray-700">Loading...</p>
      ) : contactDetails.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white text-sm lg:text-base">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-center">Name</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Email</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Phone</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Message</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {contactDetails.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-200 text-gray-800 text-center"
                >
                  <td className="border border-gray-300 px-4 py-2">{contact.user?.name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.user?.email || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.user?.phone || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 truncate max-w-xs">{contact.message}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.status === "Resolved" ? (
                      <span className="text-green-600 font-bold flex justify-center items-center gap-1">
                        <MdDone /> Resolved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-bold flex justify-center items-center gap-1">
                        <MdOutlinePendingActions /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-6">No Contact Details Found!</p>
      )}
    </div>
  );
};

export default AdminContact;
