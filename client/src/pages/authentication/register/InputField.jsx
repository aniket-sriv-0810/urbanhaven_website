import React from "react";

const InputField = ({ Icon, type, name, placeholder, value, onChange, error, inputRef }) => {
    const inputStyling =
    'w-full border border-gray-300 rounded-xl p-2  focus:outline-none focus:ring-2 focus:ring-green-200 bg-[#5454544f] placeholder:text-center placeholder:lowercase placeholder:text-gray-300 placeholder:text-xs placeholder:text-gray-300  valid:border-2 caret-green-500  ';
  return (
    <div className="relative flex flex-col">
      {/* Icon */}
      <Icon className={`absolute left-3 top-3 transition-colors duration-300 ${error ? 'text-red-500' : value ? 'text-green-500' : 'text-gray-300'}`} />
      
      {/* Input */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        className={`pl-10 ${inputStyling} ${
          error ? "border-red-500" : value ? "border-green-500" : "border-gray-200"
        }`}
        value={value}
        onChange={onChange}
        required
      />
      
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};

export default InputField;
