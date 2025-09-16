// StockDashboard.jsx (main component)
import PortfolioSelector from "./components/PortfolioSelector";
import SummaryCards from "./components/SummaryCards";
import StockCard from "./components/StockCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import RefreshButton from "./components/RefreshButton";
import { useStockData } from "./hooks/useStockData";
import { useState } from "react";

const StockDashboard = () => {
  const portfolios = ["760697", "760306"];
  const [portfolio, setPortfolio] = useState(portfolios[0]);

  const {
    stocks,
    totalProfit,
    totalValue,
    precentChange,
    dailyChange,
    loading,
    error,
    fetchData,
  } = useStockData(portfolio);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            דשבורד תיק השקעות
          </h1>
          <p className="text-gray-600">עדכון נתוני מניות בזמן אמת</p>
        </div>

        <PortfolioSelector portfolio={portfolio} setPortfolio={setPortfolio} />

        <SummaryCards
          totalProfit={totalProfit}
          totalValue={totalValue}
          precentChange={precentChange}
          dailyChange={dailyChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stocks.map((stock, index) => (
            <StockCard key={index} stock={stock} />
          ))}
        </div>

        <RefreshButton fetchData={fetchData} />
      </div>
    </div>
  );
};

export default StockDashboard;
