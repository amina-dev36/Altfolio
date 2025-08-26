import React, { use } from "react";
import { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { ChevronUp, ChevronDown } from "lucide-react";
import Error from "./Error";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const TrendingCoin = () => {
  const { trendingCoins, error, loading } = useContext(CoinContext);

  if (!trendingCoins || trendingCoins.length === 0) {
    return;
  }

  const coins = trendingCoins.slice(0, 5);
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!trendingCoins || trendingCoins.length === 0) {
    return (
      <div className="flex-grow p-8 text-center bg-gray-900 text-gray-400 min-h-screen flex items-center justify-center">
        <p>No trending coins available at the moment.</p>
      </div>
    );
  }

  return (
    <div className=" p-8 md:p-14">
      <div className="dark:bg-dark bg-gray-200 dark:text-white text-primary shadow-lg rounded-lg hidden sm:block">
        <h2 className="text-xl md:text-2xl lg:text-3xl p-4 font-semibold">
          Trending Coins
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base lg:text-lg">
            <thead>
              <tr className="text-left">
                <th className="p-4">Rank</th>
                <th className="p-4">Coin</th>
                <th className="p-4">Price</th>
                <th className="p-4 hidden sm:table-cell">Market Cap</th>
                <th className="p-4 hidden md:table-cell">Volume 24h</th>
                <th className="p-4">24h</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => (
                <tr
                  key={index}
                  onClick={() => navigate(`/market/${coin.item.id}`)}
                  className="border-b border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">{coin.item.market_cap_rank}</td>
                  <td className="p-4 flex items-center">
                    <img
                      src={coin.item.small}
                      alt={coin.item.name}
                      className="w-6 h-6 mr-2"
                    />
                    {coin.item.name}
                  </td>
                  <td className="p-4">
                    ${coin.item.price_btc.toLocaleString()}
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    ${coin.item.data.market_cap.toLocaleString()}
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    ${coin.item.data.total_volume.toLocaleString()}
                  </td>

                  <td
                    className={`p-4 font-semibold flex flex-row ${
                      coin.item.data.price_change_percentage_24h?.usd >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.item.data.price_change_percentage_24h?.usd.toFixed(2)}
                    %
                    {coin.item.data.price_change_percentage_24h?.usd >= 0 ? (
                      <ChevronUp className="inline ml-1" />
                    ) : (
                      <ChevronDown className="inline ml-1" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view */}
      <div className="sm:hidden bg-primary shadow-lg rounded-lg mt-6">
        <h2 className="text-lg font-bold mb-3">Trending Coins</h2>

        {/* Horizontal scroll container */}
        <div className="flex gap-4 overflow-x-scroll no-scrollbar">
          {coins.map((coin, index) => (
            <div
              key={index}
              onClick={() => navigate(`/market/${coin.item.id}`)}
              className="min-w-[140px] bg-dark rounded-xl p-3 shadow hover:shadow-lg transition cursor-pointer flex-shrink-0"
            >
              <img
                src={coin.item.small}
                alt={coin.item.name}
                className="w-10 h-10 mx-auto"
              />
              <h3 className="text-sm font-semibold text-center mt-2">
                {coin.item.name}
              </h3>
              <p className="text-center text-gray-400 text-xs">
                {coin.item.symbol.toUpperCase()}
              </p>
              <p
                className={`text-center font-bold mt-1 ${
                  coin.item.data.price_change_percentage_24h?.usd > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.item.data.price_change_percentage_24h?.usd.toFixed(2)}%
              </p>
              <p className="text-center text-gray-400 mt-1">
                ${coin.item.data.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCoin;
