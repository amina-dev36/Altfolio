import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { CoinContext } from "../context/CoinContext";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, Trash } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../context/ThemeContext"; // ✅ for theme

const Portfolio = () => {
  const { allCoins } = useContext(CoinContext);
  const { user } = useAuth();
  const { lightMode } = useContext(ThemeContext); // ✅ detect theme

  const [portfolio, setPortfolio] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPortfolio = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("user_id", user.id);

    if (!error) setPortfolio(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, [user]);

  useEffect(() => {
    if (search.length > 1) {
      const results = allCoins.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCoins(results.slice(0, 5));
    } else {
      setFilteredCoins([]);
    }
  }, [search, allCoins]);

  const addCoin = async (e) => {
    e.preventDefault();
    if (!user || !selectedCoin || !quantity) return;

    try {
      const { error } = await supabase.from("portfolio").insert([
        {
          user_id: user.id,
          coin_id: selectedCoin.id,
          coin_name: selectedCoin.name,
          symbol: selectedCoin.symbol,
          amount: parseFloat(quantity),
          buy_price: parseFloat(buyPrice),
        },
      ]);

      if (error) throw error;

      setSelectedCoin(null);
      setQuantity("");
      setBuyPrice("");
      setSearch("");
      fetchPortfolio();
    } catch (error) {
      console.log("fail to add coin to supabase", error.message);
    }
  };

  const deleteCoin = async (id) => {
    await supabase.from("portfolio").delete().eq("id", id);
    fetchPortfolio();
  };

  const totalValue = portfolio.reduce((sum, p) => {
    const coin = allCoins.find((c) => c.id === p.coin_id);
    return sum + (coin?.current_price || 0) * p.amount;
  }, 0);

  const totalInvested = portfolio.reduce(
    (sum, p) => sum + p.amount * p.buy_price,
    0
  );

  const profitLoss = totalValue - totalInvested;

  const chartData = [
    { name: "Invested", value: totalInvested },
    { name: "Current Value", value: totalValue },
    { name: "Profit/Loss", value: profitLoss },
  ];

  // 🎨 Theme-based chart colors
  const chartColors = {
    axis: lightMode ? "#1a202c" : "#cbd5e0",
    tooltipBg: lightMode ? "#f9fafb" : "#1a202c",
    tooltipText: lightMode ? "#1a202c" : "#e2e8f0",
    line: "#3b82f6",
  };

  return (
    <div className="min-h-screen dark:text-white text-dark my-8 mb-10 p-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6 md:mb-0 mt-8 md:mt-10 lg:mt-14">
        My Portfolio
      </h2>

      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-3 text-center">
        <div className="dark:bg-dark bg-gray-200 md:my-8 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 md:text-lg">
            Total Portfolio Value
          </h3>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        <div className="dark:bg-dark bg-gray-200 md:my-8 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 md:text-lg">
            Invested
          </h3>
          <p className="text-2xl font-bold">${totalInvested.toFixed(2)}</p>
        </div>
        <div className="dark:bg-dark bg-gray-200 mb-4 md:my-8 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-500 dark:text-gray-400 md:text-lg">P/L</h3>
          <p
            className={`text-2xl font-bold ${
              profitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitLoss >= 0 ? "+" : ""}
            {profitLoss.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Form and Chart */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <form
          onSubmit={addCoin}
          className="flex-1 space-y-3 dark:bg-dark bg-gray-200 p-6 rounded-lg shadow-lg"
        >
          <div className="flex flex-col">
            <h2 className="mb-2 md:mb-3 font-semibold md:text-lg">
              Search Coin
            </h2>
            <input
              type="text"
              placeholder="BTC, ETH, etc."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedCoin(null);
              }}
              className="border-2 p-2 w-full rounded-lg dark:border-light border-primary focus:outline-none bg-white dark:bg-dark dark:text-white"
            />

            {/* Suggestion dropdown */}
            {filteredCoins.length > 0 && !selectedCoin && (
              <div className="dark:bg-dark bg-white border rounded p-2 max-h-40 overflow-y-auto">
                {filteredCoins.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCoin(c);
                      setSearch(c.name);
                      setFilteredCoins([]);
                    }}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer p-1 rounded"
                  >
                    {c.name} ({c.symbol.toUpperCase()})
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="mb-2 md:mb-3 font-semibold md:text-lg">Quantity</h2>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-2 p-2 w-full rounded-lg dark:border-light border-primary focus:outline-none bg-white dark:bg-dark dark:text-white"
              placeholder="0.05"
              step="any"
              required
            />
          </div>

          <div className="flex flex-col">
            <h2 className="mb-2 md:mb-3 font-semibold md:text-lg">
              Purchase Price
            </h2>
            <input
              type="number"
              name="quantity"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="border-2 p-2 w-full rounded-lg dark:border-light border-primary focus:outline-none bg-white dark:bg-dark dark:text-white"
              placeholder="20000"
              step="any"
              required
            />
          </div>

          <button
            type="submit"
            onClick={addCoin}
           className="bg-light w-full flex items-center justify-center gap-2 text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-primary hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4"
          >
            <PlusCircle size={20} />
            Add Coin
          </button>
        </form>

        {/* Chart */}
        <div className="flex-1 space-y-3 dark:bg-dark bg-gray-200 p-6 rounded-lg shadow-lg">
          <h2 className="mb-2 md:mb-3 font-semibold md:text-lg">
            Portfolio Value Breakdown
          </h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke={chartColors.axis} />
                <YAxis stroke={chartColors.axis} />
                <Tooltip
                  formatter={(value) => `$${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: chartColors.tooltipBg,
                    border: "none",
                    color: chartColors.tooltipText,
                  }}
                  labelStyle={{ color: chartColors.tooltipText }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColors.line}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                Add coins to see your portfolio chart.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Table */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-xl text-light animate-pulse">Loading assets...</p>
        </div>
      ) : (
        <div className="dark:bg-dark bg-gray-200 mt-6 md:mt-8 p-3 md:p-6 rounded-lg overflow-x-scroll no-scrollbar">
          {portfolio.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-light">
                You have no coins in your portfolio.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use the form above to add your first crypto coin.
              </p>
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-light text-left text-gray-500 dark:text-gray-400">
                  <th className="py-2 px-4">Coin</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Buy Price</th>
                  <th className="py-2 px-4">Current Price</th>
                  <th className="py-2 px-4">Value</th>
                  <th className="py-2 px-4">P/L</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((p) => {
                  const coin = allCoins.find((c) => c.id === p.coin_id);
                  const currentPrice = coin?.current_price || 0;
                  const value = currentPrice * p.amount;
                  const invested = p.buy_price * p.amount;
                  const profit = value - invested;

                  return (
                    <tr
                      key={p.id}
                      className="border-b border-gray-300 dark:border-gray-700"
                    >
                      <td className="py-2 px-4">
                        {p.coin_name} ({p.symbol.toUpperCase()})
                      </td>
                      <td className="py-2 px-4 text-center">{p.amount}</td>
                      <td className="py-2 px-4">${p.buy_price}</td>
                      <td className="py-2 px-4">${currentPrice.toFixed(2)}</td>
                      <td className="py-2 px-4">${value.toFixed(2)}</td>
                      <td
                        className={`py-2 px-4 ${
                          profit >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {profit >= 0 ? "+" : ""}
                        {profit.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => deleteCoin(p.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
