import React, { useContext } from "react";
import NewsCard from "./NewsCard";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const HomeNewsSection = () => {
  const { cryptoNews } = useContext(CoinContext);

  const topFiveNews = cryptoNews?.slice(0, 5) || [];

  return (
    <section className="mt-10 px-8 md:px-14">
      <h2 className="text-xl md:text-2xl text-primary dark:text-white lg:text-3xl font-semibold mb-4 md:mb-6">
        Latest Crypto News
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topFiveNews.map((news, index) => (
          <NewsCard key={index} cryptoNews={news} />
        ))}
      </div>
      <Link to={'/news'} className="flex justify-center mt-4 md:mt-6">
        <button className="bg-light text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-primary hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4">
          See More News
        </button>
      </Link>
    </section>
  );
};

export default HomeNewsSection;
