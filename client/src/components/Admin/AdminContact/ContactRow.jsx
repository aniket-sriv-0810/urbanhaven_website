import React ,{useState} from "react";
import { MdDeleteForever, MdDone, MdOutlinePendingActions } from "react-icons/md";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ErrorPopup from "../../PopUps/ErrorPopup/ErrorPopup";
const ContactRow = ({ contact , onDelete }) => {
   const [deleting, setDeleting] = useState(false);
   const navigate = useNavigate();
   const [error , setError] = useState("");
    const handleDelete = async () => {
      if (deleting) return;
      setDeleting(true);
  
      try {
        const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/admin/contact/${contact._id}`, {
          withCredentials: true,
        });
        if (resp.status === 200) {
          navigate('/admin')
        }
        onDelete(contact._id); // Notify parent component
      } catch (error) {
        setError("Error in deleting contact details");
        setDeleting(false);
      } finally {
        setDeleting(false);
      }
    };
  
  return (
    <>
   <div className="text-center ">
          {error && <ErrorPopup message={error} onClose={() => setError("")} />} 
         </div>
    <tr className="hover:bg-gray-200 text-gray-800 text-center">
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
      {/* Delete Button (Aligned in Its Column) */}
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`p-3 rounded-full text-white transition-colors ${
                  deleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                <MdDeleteForever size={20} />
              </button>
            </td>
    </tr>
    </>
  );
};

export default ContactRow;
