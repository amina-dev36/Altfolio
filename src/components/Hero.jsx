import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const { signInWithGoogle, user } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 md:gap-15 md:justify-around p-8 mt-8 md:mt-16 md:p-12 text-primary dark:text-white">
      <div className="flex flex-col items-start justify-center gap-4 md:gap-8">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold sm:max-w-2xs lg:max-w-4xl">
          Live prices, market trends, and your personal portfolio – all in one
          place
        </h2>

        {user ? (
          <Link to={'/portfolio'}>
            <button className="bg-light text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-primary hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4">
              View Your Portfolio
            </button>
          </Link>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-light text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-primary hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4"
          >
            Get Started
          </button>
        )}
      </div>
      <div>
        <img
          src={assets.hero_logo}
          className="md:w-100 w-50 animate-pulse fill-light"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
