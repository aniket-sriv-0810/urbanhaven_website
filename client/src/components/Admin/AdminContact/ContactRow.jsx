import React from "react";
import { MdDone, MdOutlinePendingActions } from "react-icons/md";

const ContactRow = ({ contact }) => {
  return (
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
    </tr>
  );
};

export default ContactRow;
