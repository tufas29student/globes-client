// hooks/useStockData.js
import { useState, useEffect, useCallback } from "react";
import { isDev, devApi, proApi } from "../utils/api";

export const useStockData = (portfolio) => {
  const [stocks, setStocks] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [precentChange, setPrecentChange] = useState(0);
  const [dailyChange, setDailyChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, [portfolio, fetchData]);

  return {
    stocks,
    totalProfit,
    totalValue,
    precentChange,
    dailyChange,
    loading,
    error,
    fetchData,
  };
};
