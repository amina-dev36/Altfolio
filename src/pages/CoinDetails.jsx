import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import CoinDetailChart from "../components/CoinDetailChart";

const CoinDetails = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoinDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          params: {
            sparkline: true,
          },
        }
      );

      if (response.data) {
        console.log(response.data);
        setCoinData(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetail();
  }, [coinId]);

  

  const formatPrice = (price) => (price ? `$${price.toLocaleString()}` : "N/A");

  const formatPercentage = (percentage) => {
    if (percentage == null) return "N/A";
    const isPositive = percentage >= 0;
    return (
      <span className={isPositive ? "text-green-500" : "text-red-500"}>
        {isPositive ? "▲" : "▼"} {percentage.toFixed(2)}%
      </span>
    );
  };

  

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!coinData) return null;


  return (
    <div className="min-h-screen text-white p-8 mt-20 md:mt-25">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 dark:bg-dark bg-gray-200 p-6 rounded-2xl shadow-lg text-primary dark:text-white">
        <div className="flex-grow flex items-center gap-3">
          <img
            src={coinData.image?.large || coinData.image?.small}
            alt={coinData.name}
            className="w-16 h-16"
          />
          <div>
            <h2 className="text-3xl font-bold">{coinData.name}</h2>
            <p className="uppercase text-gray-400 ">{coinData.symbol}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-4xl font-semibold">
            {formatPrice(coinData.market_data?.current_price?.usd)}
          </p>
          <div className="flex gap-4 mt-2 text-sm justify-end">
            <span>
              1h:{" "}
              {formatPercentage(
                coinData.market_data?.price_change_percentage_1h_in_currency
                  ?.usd
              )}
            </span>
            <span>
              24h:{" "}
              {formatPercentage(
                coinData.market_data?.price_change_percentage_24h_in_currency
                  ?.usd
              )}
            </span>
            <span>
              7d:{" "}
              {formatPercentage(
                coinData.market_data?.price_change_percentage_7d_in_currency
                  ?.usd
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Informations */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="dark:bg-dark bg-gray-200 p-5 rounded-xl shadow">
          <p className="dark:text-gray-400 text-gray-800">Market Cap Rank</p>
          <p className="text-lg text-gray-600 dark:text-white font-semibold">
            {coinData.market_data?.market_cap_rank}
          </p>
        </div>
        <div className="dark:bg-dark bg-gray-200 p-5 rounded-xl shadow">
          <p className="dark:text-gray-400 text-gray-800">Market Cap</p>
          <p className="text-lg text-gray-600 dark:text-white font-semibold">
            {formatPrice(coinData.market_data?.market_cap?.usd)}
          </p>
        </div>
        <div className="dark:bg-dark bg-gray-200 p-5 rounded-xl shadow">
          <p className="dark:text-gray-400 text-gray-800">24h Volume</p>
          <p className="text-lg text-gray-600 dark:text-white font-semibold">
            {formatPrice(coinData.market_data?.total_volume?.usd)}
          </p>
        </div>
        <div className="dark:bg-dark bg-gray-200 p-5 rounded-xl shadow">
          <p className="dark:text-gray-400 text-gray-800">All-Time High</p>
          <p className="text-lg text-gray-600 dark:text-white font-semibold">
            {formatPrice(coinData.market_data?.ath?.usd)}
          </p>
        </div>
      </div>

      {/* Chart for coin detail */}
      <div className="p-6 dark:bg-dark bg-gray-200 rounded-2xl shadow-lg mt-8">
        <h2 className="text-xl text-primary dark:text-white font-bold mb-4 ms-2">{coinData.name} Price Chart</h2>
        <CoinDetailChart coinId={coinData.id} />
      </div>

      {/* About coin */}
      <div className="dark:bg-dark bg-gray-200 p-6 rounded-2xl shadow-lg mt-8 mb-12 md:mb-18">
        <h2 className="text-xl md:text-2xl dark:text-white text-primary font-bold mb-4">
          About {coinData.name}
        </h2>
        <div
          className="dark:text-gray-300 text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: coinData.description?.en }}
        />
      </div>
    </div>
  );
};

export default CoinDetails;
