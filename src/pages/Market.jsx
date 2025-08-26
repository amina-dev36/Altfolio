import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { ChevronUp, ChevronDown } from "lucide-react";
import MobileView from "../components/MobileView";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

const Market = () => {
  const { allCoins, error, loading } = useContext(CoinContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  const navigate = useNavigate();

  if (allCoins.length === 0) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center p-8 text-white">
        <p className="text-xl">
          No coin data available. Please try again later.
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCoins(allCoins);
      return;
    }

    const filtered = allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [allCoins, searchQuery]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className=" p-8 mb-8 mt-18 md:mt-22 md:p-14 text-white">
      <div>
        <input
          type="text"
          className="w-full p-4 rounded-xl dark:bg-dark border-2 dark:border-light border-primary dark:text-white text-primary placeholder-gray-400 text-lg md:text-xl focus:outline-none mb-4 md:mb-8 transition-colors duration-200"
          placeholder="Search for a coin..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="dark:bg-dark bg-gray-200  shadow-lg rounded-lg hidden sm:block">
        <h2 className="text-xl md:text-2xl text-primary dark:text-white lg:text-3xl p-4 font-semibold">
          Coin Market
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full dark:text-white text-primary text-sm md:text-base lg:text-lg">
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
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
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
                        coin.price_change_percentage_24h_in_currency >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <span className="flex flex-row items-center">
                        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
                        %
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
                ))
              ) : (
                <tr className="border-b border-gray-700">
                  <td colSpan="7" className="p-4 text-center text-gray-400">
                    No coins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile view */}
      <div className="sm:hidden bg-primary shadow-lg rounded-lg mt-5">
        <MobileView header={"Coin Market"} coins={filteredCoins} />
      </div>
    </div>
  );
};

export default Market;
