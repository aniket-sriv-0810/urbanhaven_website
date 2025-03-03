import React, { forwardRef } from "react";

const InputField = forwardRef(({ type, name, placeholder, value, onChange, error, icon }, ref) => {
  const inputStyling =
  'w-full border border-gray-300 rounded-xl p-2 my-1 focus:outline-none focus:ring-2 focus:ring-green-300 bg-[#5454544f] placeholder:text-center placeholder:lowercase placeholder:text-xs placeholder:text-gray-400  valid:border-2 caret-green-500 ';
  return (
    <>
        
    <div className="relative flex flex-col">
      {icon && (
        <span
          className={`absolute left-3 top-4 ${
            error ? "text-red-500" : value ? "text-green-500" : "text-gray-300"
          }`}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref} // Attach the ref here
        className={` pl-10 ${inputStyling} ${
          error ? "border-red-500" : value ? "border-green-500 " : " border-gray-200"
        }`}
        required
      />
  
    </div>
    </>
  );
});

export default InputField;
