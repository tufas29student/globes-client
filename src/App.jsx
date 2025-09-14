import { useState, useEffect, useCallback } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Calendar,
} from "lucide-react";

const isDev = () => import.meta.env.VITE_APP_DEV === "true";
const devApi = () => import.meta.env.VITE_APP_DEV_API;
const proApi = () => import.meta.env.VITE_APP_PRO_API;

const portfolios = ["760697", "760306"];

const StockDashboard = () => {
  const [portfolio, setPortfolio] = useState(portfolios[0]);
  const [stocks, setStocks] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [precentChange, setPrecentChange] = useState(0);
  const [dailyChange, setDailyChange] = useState(0); // Added daily change state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reusable fetch function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      if (isDev()) {
        response = await fetch(`${devApi()}?portfolio=${portfolio}`);
      } else {
        response = await fetch(`${proApi()}?portfolio=${portfolio}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data, totalProfit, totalValue, precentChange, dailyChange } =
        await response.json();
      setStocks(data);
      setTotalProfit(totalProfit);
      setTotalValue(totalValue);
      setPrecentChange(precentChange);
      setDailyChange(dailyChange);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError(`Failed to fetch stock data: ${err.message}`);
      setLoading(false);
    }
  }, [portfolio]);

  // Run on first load and whenever portfolio changes
  useEffect(() => {
    fetchData();
  }, [portfolio, fetchData]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">טוען נתוני מניות...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 p-8 rounded-xl">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            דשבורד תיק השקעות
          </h1>
          <p className="text-gray-600">עדכון נתוני מניות בזמן אמת</p>
        </div>

        {/* Portfolio Selector */}
        <div className="mb-8">
          <p className="text-center text-gray-600 mb-3 font-medium">
            בחר תיק השקעות
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            {portfolios.map((p) => (
              <div
                key={p}
                onClick={() => setPortfolio(p)}
                className={`cursor-pointer rounded-xl p-4 shadow-lg transition-all duration-300 w-40 text-center border-2 ${
                  portfolio === p
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white transform scale-105 border-indigo-500"
                    : "bg-white text-gray-700 hover:bg-indigo-50 hover:shadow-xl border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-full p-2 mb-2 ${
                      portfolio === p
                        ? "bg-white bg-opacity-20"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {p === "760306" ? (
                      <Activity className="h-5 w-5" /> // Demo portfolio icon
                    ) : (
                      <DollarSign className="h-5 w-5" /> // Real portfolio icon
                    )}
                  </div>
                  <span className="font-medium">
                    {p === "760306" ? "דמו" : "אמיתי"}
                  </span>
                  <span className="text-xs opacity-80 mt-1">
                    פורטפוליו: {p}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-600 mb-3 font-bold">
          נפתח בתאריך {portfolio === "760306" ? "05/09/2025" : "12/09/2025"}
        </div>

        {/* Summary Cards - Updated to 4 columns */}
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
                  {getChangeIcon(`${precentChange.toFixed(2)}%`)}
                </span>
              </div>
            </div>
          </div>

          {/* New Daily Percentage Change Card */}
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

        {/* Stocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stocks.map((stock, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex-1">
                  {stock.name}
                </h3>
                <div
                  className={`flex items-center gap-1 ${getChangeColor(
                    stock.change
                  )}`}
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
                      parseFloat(stock.profit) >= 0
                        ? "text-green-600"
                        : "text-red-600"
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
          ))}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            רענן נתונים
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
