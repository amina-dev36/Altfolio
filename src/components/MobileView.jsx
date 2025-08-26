import React from "react";
import { useNavigate } from "react-router-dom";

const MobileView = ({ header, coins }) => {
  const navigate = useNavigate();

  return (
    <div className="sm:hidden">
      <h2 className="text-lg font-bold mb-3">{header}</h2>

      {/* Horizontal scroll container */}
      <div className="flex gap-4 overflow-x-scroll no-scrollbar">
        {coins.length > 0 ? (
          coins.map((coin) => (
            <div
              onClick={() => navigate(`/market/${coin.id}`)}
              key={coin.id}
              className="min-w-[140px] bg-dark rounded-xl p-3 shadow hover:shadow-lg transition cursor-pointer flex-shrink-0"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 mx-auto"
              />
              <h3 className="text-sm font-semibold text-center mt-2">
                {coin.name}
              </h3>
              <p className="text-center text-gray-400 text-xs">
                {coin.symbol.toUpperCase()}
              </p>
              <p
                className={`text-center font-bold mt-1 ${
                  coin.price_change_percentage_24h_in_currency > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
              </p>
              <p className="text-center text-gray-400 mt-1">
                ${coin.current_price}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No coins found.</p>
        )}
      </div>
    </div>
  );
};

export default MobileView;
