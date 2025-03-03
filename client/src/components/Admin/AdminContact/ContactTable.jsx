import React from "react";
import ContactRow from "./ContactRow";

const ContactTable = ({ contacts }) => {
  return (
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
          {contacts.map((contact) => (
            <ContactRow key={contact._id} contact={contact} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
