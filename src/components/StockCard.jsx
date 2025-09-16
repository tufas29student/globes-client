// components/StockCard.jsx
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const StockCard = ({ stock }) => {
  const formatNumber = (value) => {
    return parseFloat(value.replace(/,/g, "")).toLocaleString();
  };

  const getChangeColor = (change) => {
    const numChange = parseFloat(change.replace("%", ""));
    if (numChange > 0) return "text-green-600";
    if (numChange < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getChangeIcon = (change) => {
    const numChange = parseFloat(change.replace("%", ""));
    if (numChange > 0) return <TrendingUp className="w-4 h-4" />;
    if (numChange < 0) return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex-1">
          {stock.name}
        </h3>
        <div
          className={`flex items-center gap-1 ${getChangeColor(stock.change)}`}
        >
          {getChangeIcon(stock.change)}
          <span dir="ltr" className="font-medium">
            {stock.change}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-sm">מחיר אחרון</p>
          <p className="text-lg font-semibold text-gray-800">
            {formatNumber(stock.last)}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">שווי</p>
          <p className="text-lg font-semibold text-blue-600">
            ₪{stock.value.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">רווח/הפסד</p>
          <p
            className={`text-lg font-semibold ${
              parseFloat(stock.profit) >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <span dir="ltr">{stock.profit.toLocaleString()}</span>
            <span> ₪</span>
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">תשואה</p>
          <span
            dir="ltr"
            className={`text-lg font-semibold align-right ${getChangeColor(
              stock.yield
            )}`}
          >
            {stock.yield}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
