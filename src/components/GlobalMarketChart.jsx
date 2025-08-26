import React, { useState, useEffect, useContext } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const GlobalMarketChart = () => {
  const [chartData, setChartData] = useState([]);
  const [seletedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeRange, setTimeRange] = useState("30");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lightMode } = useContext(ThemeContext);

  const coins = [
    { name: "Bitcoin", value: "bitcoin" },
    { name: "Ethereum", value: "ethereum" },
    { name: "Ripple", value: "ripple" },
    { name: "Litecoin", value: "litecoin" },
    { name: "Cardano", value: "cardano" },
  ];

  const timeFrame = [
    { name: "24h", value: "1" },
    { name: "7d", value: "7" },
    { name: "30d", value: "30" },
    { name: "1y", value: "365" },
  ];

  const fetchGlobalMarketData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${seletedCoin}/market_chart?vs_currency=usd&days=${timeRange}`
      );
      if (!response.data || !response.data.prices) {
        throw new Error("No data found for the selected coin");
      }

      const formattedData = response.data.prices.map((price) => {
        return {
          date:
            timeRange === "1"
              ? new Date(price[0]).toLocaleTimeString("en-US")
              : new Date(price[0]).toLocaleDateString("en-US"),
          price: price[1],
        };
      });

      setChartData(formattedData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching global market data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalMarketData();
  }, [seletedCoin, timeRange]);

  // 🎨 Dynamic colors based on theme
  const colors = {
    grid: lightMode ? "#e2e8f0" : "#4a5568", // gray-300 vs gray-600
    axis: lightMode ? "#1a202c" : "#cbd5e0", // dark text vs light text
    tooltipBg: lightMode ? "#f9fafb" : "#1a202c", // light vs dark bg
    tooltipText: lightMode ? "#1a202c" : "#e2e8f0", // dark vs light text
    line: "#3b82f6", // blue-500, works on both
  };

  return (
    <div className="p-8 md:p-14">
      <div className="dark:bg-dark bg-gray-200 p-6 rounded-lg">
        <div className="flex flex-row gap-5 md:gap-6 items-center py-2 md:py-4">
          <h2 className="text-xl text-primary dark:text-white md:text-2xl lg:text-3xl py-4 font-semibold">
            Global Market Data
          </h2>
          <select
            value={seletedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="border border-gray-300 dark:bg-dark dark:text-white bg-white text-dark p-2 rounded-lg"
          >
            {coins.map((coin) => (
              <option value={coin.value} key={coin.value}>
                {coin.name}
              </option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 dark:bg-dark dark:text-white bg-white text-dark p-2 rounded-lg"
          >
            {timeFrame.map((time) => (
              <option value={time.value} key={time.value}>
                {time.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          {loading && <p>Loading chart data...</p>}
          {error && (
            <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Error!</h2>
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && chartData.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="5 3" stroke={colors.grid} />
                <XAxis dataKey="date" stroke={colors.axis} />
                <YAxis
                  stroke={colors.axis}
                  domain={["auto", "auto"]}
                  tickFormatter={(tick) =>
                    `$${new Intl.NumberFormat().format(tick)}`
                  }
                />
                <Tooltip
                  formatter={(value) => new Intl.NumberFormat().format(value)}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: colors.tooltipBg,
                    borderColor: colors.grid,
                    color: colors.tooltipText,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={colors.line}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalMarketChart;
