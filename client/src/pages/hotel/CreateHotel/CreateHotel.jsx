import React from "react";
import HotelForm from "../../../components/Hotels/Create-Hotel/HotelForm";

const CreateHotel = () => {
  return (
    <div className="p-10 flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-500 to-zinc-300">
      <div className="bg-slate-200 shadow-lg shadow-black rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register a New Hotel
        </h1>
        <HotelForm  />
      </div>
    </div>
  );
};

export default CreateHotel;
