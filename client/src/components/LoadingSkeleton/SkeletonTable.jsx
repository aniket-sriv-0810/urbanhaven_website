import React from "react";

const SkeletonTable = () => {
  return (
    <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
      <thead>
        <tr className="bg-gray-300 animate-pulse">
          {Array(8).fill().map((_, index) => (
            <th key={index} className="px-6 py-4 border border-gray-400">&nbsp;</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(5).fill().map((_, rowIndex) => (
          <tr key={rowIndex} className="bg-gray-100 animate-pulse">
            <td className="border border-gray-400 px-4 py-4 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400 mx-auto"></div>
            </td>
            {Array(5).fill().map((_, colIndex) => (
              <td key={colIndex} className="border border-gray-400 px-4 py-4">
                <div className="h-5 bg-gray-400 rounded w-3/4 mx-auto"></div>
              </td>
            ))}
            <td className="border border-gray-400 px-4 py-4 text-center">
              <div className="w-10 h-10 bg-gray-400 rounded-full mx-auto"></div>
            </td>
            <td className="border border-gray-400 px-4 py-4 text-center">
              <div className="w-10 h-10 bg-gray-400 rounded-full mx-auto"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
