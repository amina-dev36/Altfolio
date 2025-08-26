import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white flex flex-col md:flex-row gap-5 md:justify-between border-t dark:border-light border-primary rounded-[100px] p-8 md:p-12">
      <div>
        <Link to="/" className="flex items-center gap-2 text-white">
          <img
            src={assets.altfolio}
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <p className="text-lg md:text-2xl text-primary dark:text-white font-bold cursor-pointer ">
            Altfolio
          </p>
        </Link>
        <p className="text-sm dark:text-gray-200 text-gray-600 max-w-2xs">
          We has the full types of potential for your start-up business
        </p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary dark:text-white py-2">Quick Links</h2>
        <p className=" dark:text-gray-200 text-gray-800">About Us</p>
        <p className=" dark:text-gray-200 text-gray-800">Our Services</p>
        <p className=" dark:text-gray-200 text-gray-800">Community</p>
        <p className=" dark:text-gray-200 text-gray-800">Testimonials</p>
        <p className=" dark:text-gray-200 text-gray-800">FAQ</p>
      </div>
      <div>
        <h2 className="text-lg text-primary dark:text-white font-semibold py-2">Company</h2>
        <p className=" dark:text-gray-200 text-gray-800">About Us</p>
        <p className=" dark:text-gray-200 text-gray-800">Career Tips</p>
        <p className=" dark:text-gray-200 text-gray-800">Career</p>
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl text-primary dark:text-white font-semibold">
          Join the Crypto Community
        </h2>
        <div className="border dark:border-light border-primary rounded-full my-3 md:my-6 w-75 md:w-85 flex flex-row justify-between ">
          <input type="text" className="dark:text-white text-primary p-2 md:p-3 outline-none" placeholder="Enter your email" />
          <button className="bg-light text-primary py-3 px-6 md:py-4 md:px-8 rounded-full ">Join Us</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
