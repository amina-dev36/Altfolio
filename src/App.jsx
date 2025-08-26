import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import Footer from "./components/Footer";
import CoinDetails from "./pages/CoinDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="dark:bg-primary bg-gray-50">
      <ToastContainer />
      <Navbar />

      <div>
        <Routes>
          <>
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/market" element={<Market />} />
                <Route path="/market/:coinId" element={<CoinDetails />} />

                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/news" element={<News />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/market" element={<Market />} />
                <Route path="/market/:coinId" element={<CoinDetails />} />
                <Route path="/news" element={<News />} />
              </>
            )}
          </>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
