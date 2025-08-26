import React from "react";

const Error = () => {
  return (
    <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 mx-auto mb-4 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-xl font-bold mb-2">Error!</h2>
      
    </div>
  );
};

export default Error;
