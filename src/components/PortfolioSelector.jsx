// components/PortfolioSelector.jsx
import { Activity, DollarSign } from "lucide-react";

const portfolios = ["760697", "760306"];

const PortfolioSelector = ({ portfolio, setPortfolio }) => {
  return (
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
                  <Activity className="h-5 w-5" />
                ) : (
                  <DollarSign className="h-5 w-5" />
                )}
              </div>
              <span className="font-medium">
                {p === "760306" ? "דמו" : "אמיתי"}
              </span>
              <span className="text-xs opacity-80 mt-1">פורטפוליו: {p}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-600 mb-3 font-bold mt-4">
        נפתח בתאריך {portfolio === "760306" ? "05/09/2025" : "12/09/2025"}
      </div>
    </div>
  );
};

export default PortfolioSelector;
