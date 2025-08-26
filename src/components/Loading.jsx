import React from "react";

const Loading = () => {
  return (
    <div className="items-center">
      <svg>
        <circle
          cx="50"
          cy="50"
          r="20"
          stroke="#6EC9F6"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="20"
          stroke="#4a5568"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      Loading data...
    </div>
  );
};

export default Loading;
