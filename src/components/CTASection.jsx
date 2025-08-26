import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="dark:bg-primary bg-gray-200 flex flex-col lg:flex-row gap-6 items-center justify-between m-8 md:m-14 p-4 md:p-8 rounded-lg shadow-2xl border dark:border-light border-dark">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-primary font-semibold max-w-lg md:max-w-2xl py-2 md:py-4">
          Cryptocurrency Market Overview
        </h2>
        <p className="text-sm md:text-lg dark:text-gray-200  text-gray-800 max-w-lg md:max-w-2xl">
          Here you'll find a comprehensive view of the current market landscape,
          including real-time data, key metrics, and detailed insights into
          major cryptocurrencies.
        </p>
      </div>
      <div>
        <Link to={'/market'}>
          <button className="bg-light text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-primary hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
