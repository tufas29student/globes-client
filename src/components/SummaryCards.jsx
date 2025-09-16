// components/SummaryCards.jsx
import { DollarSign, Activity, Calendar } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

const SummaryCards = ({
  totalProfit,
  totalValue,
  precentChange,
  dailyChange,
}) => {
  const getChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">רווח/הפסד</p>
            <p
              className={`text-2xl font-bold ${
                totalProfit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span dir="ltr">{totalProfit.toLocaleString()}</span>
              <span> ₪</span>
            </p>
          </div>
          <div
            className={`p-3 rounded-full ${
              totalProfit >= 0 ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <DollarSign
              className={`w-6 h-6 ${
                totalProfit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">סך הכל שווי</p>
            <p className="text-2xl font-bold text-blue-600">
              ₪{totalValue.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-full bg-blue-100">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div dir="ltr">
            <p className="text-gray-500 text-sm">רווח באחוזים</p>
            <p
              className={`text-2xl font-bold ${
                precentChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {precentChange.toFixed(2)}%
            </p>
          </div>
          <div className="p-3 rounded-full bg-purple-100">
            <span className="text-purple-600">
              {getChangeIcon(precentChange)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">רווח באחוזים יומי</p>
            <p
              className={`text-2xl font-bold ${
                dailyChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {dailyChange.toFixed(2)}%
            </p>
          </div>
          <div className="p-3 rounded-full bg-orange-100">
            <Calendar
              className={`w-6 h-6 ${
                dailyChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
