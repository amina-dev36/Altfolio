import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [cryptoNews, setCryptoNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            price_change_percentage: "1h,24h",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      if (response.data) {
        setAllCoins(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching coins:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchTrendingCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending",
        {
          params: {
            vs_currency: "usd",
            price_change_percentage: "1h,24h",
          },
        }
      );

      if (response.data && response.data.coins) {
        setTrendingCoins(response.data.coins);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching trending coins:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const news_api = import.meta.env.VITE_NEWS_API_KEY;

  const fetchCryptoNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${news_api}`
      );
      if(response.data) {
        setCryptoNews(response.data.articles);
      }
      
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoins();
    fetchTrendingCoins();
    fetchCryptoNews();
  }, []);

  const value = {
    allCoins,
    fetchAllCoins,
    trendingCoins,
    error,
    loading,
    cryptoNews
  };

  return (
    <CoinContext.Provider value={value}>{props.children}</CoinContext.Provider>
  );
};

export { CoinContextProvider };
