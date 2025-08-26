import React, { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import Loading from "../components/Loading"
import Error from "../components/Error"
import NewsCard from "../components/NewsCard";

const News = () => {
  const { cryptoNews, loading, error } = useContext(CoinContext);

  if(error) {
    return <Error />
  }

  if(loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen p-8 md:p-12 mt-16 md:mt-20 dark:text-white text-primary">
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
        Latest Crypto News
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cryptoNews.length > 0 ? (
          cryptoNews.map((news, index) => (
            <NewsCard key={index} cryptoNews={news} />
          ))
        ) : (
          <p>No article found</p>
        )}
      </div>
    </div>
  );
};

export default News;
