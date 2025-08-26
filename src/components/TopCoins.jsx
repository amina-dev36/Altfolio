import React, { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { ChevronUp, ChevronDown } from "lucide-react";
import MobileView from "./MobileView";
import Loading from "./Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const TopCoins = () => {
  const { allCoins, error, loading } = useContext(CoinContext);

  const navigate = useNavigate();

  const topCoins = allCoins.slice(0, 10);

  if(error) {
    return <Error />
  }

  if(loading) {
    return <Loading />
  }

  return (
    <div className=" p-8 md:p-14">
      <div className="dark:bg-dark bg-gray-200 text-primary dark:text-white shadow-lg rounded-lg hidden sm:block">
        <h2 className="text-xl md:text-2xl lg:text-3xl p-4 font-semibold">
          Top Coins
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
                <th className="p-4 hidden lg:table-cell">1h</th>
                <th className="p-4">24h</th>
              </tr>
            </thead>
            <tbody>
              {topCoins.map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() => navigate(`/market/${coin.id}`)}
                  className="border-b border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">{coin.market_cap_rank}</td>
                  <td className="p-4 flex items-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6 mr-2"
                    />
                    {coin.name}
                  </td>
                  <td className="p-4">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    ${coin.total_volume.toLocaleString()}
                  </td>
                  <td
                    className={`p-4 hidden lg:table-cell font-semibold ${
                      coin.price_change_percentage_1h_in_currency >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span className="flex flex-row items-center">
                      {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                      {coin.price_change_percentage_1h_in_currency >= 0 ? (
                        <ChevronUp className="inline ml-1" />
                      ) : (
                        <ChevronDown className="inline ml-1" />
                      )}
                    </span>
                  </td>

                  <td
                    className={`p-4 font-semibold flex flex-row ${
                      coin.price_change_percentage_24h_in_currency >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                    {coin.price_change_percentage_24h_in_currency >= 0 ? (
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
      <div className="sm:hidden bg-primary shadow-lg rounded-lg mt-5">
        <MobileView header={"Top Coins"} coins={topCoins} />
      </div>
    </div>
  );
};

export default TopCoins;
