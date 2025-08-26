import React, { useState, useEffect } from "react";
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
import Loading from "./Loading";
import Error from "./Error";

const CoinDetailChart = ({ coinId }) => {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState("30");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeFrame = [
    { name: "24h", value: "1" },
    { name: "7d", value: "7" },
    { name: "30d", value: "30" },
    { name: "1y", value: "365" },
  ];

  const fetchCoinDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeRange}`
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
      console.log("Error fetching coin chart data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetail();
  }, [timeRange, coinId]);

  return (
    <div className="w-full">
      {/* Time range selector */}
      <div className="mb-5 ml-2">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-dark 
                     text-dark dark:text-white 
                     p-2 rounded-lg shadow"
        >
          {timeFrame.map((time) => (
            <option value={time.value} key={time.value}>
              {time.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div>
        {loading && <Loading />}
        {error && <Error />}
        {!loading && !error && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {/* Grid */}
              <CartesianGrid
                strokeDasharray="5 3"
                stroke="#e2e8f0" // light mode grid
                className="dark:stroke-gray-600" // dark mode grid
              />

              {/* X Axis */}
              <XAxis
                dataKey="date"
                stroke="#1a202c" // text for light
                className="dark:stroke-gray-300" // text for dark
              />

              {/* Y Axis */}
              <YAxis
                stroke="#1a202c"
                className="dark:stroke-gray-300"
                domain={["auto", "auto"]}
                tickFormatter={(tick) =>
                  `$${new Intl.NumberFormat().format(tick)}`
                }
              />

              {/* Tooltip */}
              <Tooltip
                formatter={(value) =>
                  `$${new Intl.NumberFormat().format(value)}`
                }
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "white", // light mode
                  borderColor: "#e2e8f0",
                  color: "#1a202c",
                }}
                wrapperClassName="dark:bg-dark dark:border-gray-700 dark:text-white rounded-lg p-2"
              />

              {/* Line */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="#6EC9F6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {!loading && !error && chartData.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No data available for the selected coin.
          </p>
        )}
      </div>
    </div>
  );
};

export default CoinDetailChart;
