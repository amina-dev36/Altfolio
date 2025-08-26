import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const NewsCard = ({ cryptoNews }) => {
  // channing
  const title = cryptoNews.title;
  const description = cryptoNews.description;
  const sourceName = cryptoNews.source?.name;
  const author = cryptoNews.author;
  const url = cryptoNews.url;
  const imageUrl = cryptoNews.image;
  const publishedAt = cryptoNews.publishedAt;

  // Functions to handle missing data
  const displayAuthor = author ? `by ${author}` : "";
  const displayDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString()
    : "";
  

  if (!title || !url) return null;

  return (
    <div className="flex flex-col dark:bg-dark bg-gray-200 rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      <Link
        to={url}
        target="_blank"
        className="flex flex-col h-full"
      >
        <div className="relative w-full aspect-video">
          
          <img
            src={imageUrl ? imageUrl : assets.news_image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg md:text-xl font-bold dark:text-gray-100 text-primary mb-2 leading-tight">
              {title}
            </h3>
            <p className="dark:text-gray-300 text-gray-800 text-sm md:text-base line-clamp-3 mb-4">
              {description || "No description available"}
            </p>
          </div>
          <div className="flex justify-between items-center dark:text-gray-400 text-gray-600 text-xs md:text-sm mt-auto">
            <span className="font-semibold">{sourceName}</span>
            <span className="text-right">
              {displayAuthor} <br /> {displayDate}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
