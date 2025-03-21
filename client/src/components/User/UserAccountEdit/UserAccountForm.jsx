import React from "react";
import { FaCheckCircle } from "react-icons/fa";
const UserAccountForm = ({ userData, handleChange, handleSubmit , isLoading}) => {
  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {["name", "username", "phone", "email"].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field === "email" ? "email" : field === "phone" ? "number" : "text"}
            name={field}
            id={field}
            value={userData[field]}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full border-gray-500 border-2 font-semibold px-4 py-2 text-white rounded-xl mt-4 ${
          isLoading ? " bg-gradient-to-r from-indigo-600 to-purple-600 cursor-not-allowed" : "flex justify-center items-center gap-3 w-full py-3 px-6 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md text-lg font-medium hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        } flex items-center justify-center gap-2`}
      >
        {isLoading ? (
          <>
            <span className="animate-pulse flex items-center gap-3 text-white">
            <div className=" w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Saving Changes...</span>
          </>
        ) : (
          <p className="flex justify-center items-center gap-3">
          <FaCheckCircle/>
          Save Changes
          </p>
        )}
      </button>
    </form>
  );
};

export default UserAccountForm;
