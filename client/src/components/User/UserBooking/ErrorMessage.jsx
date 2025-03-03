import React from "react";
const ErrorMessage = ({ message }) => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{message}</p>
      </div>
    );
  };
  
  export default ErrorMessage;
  