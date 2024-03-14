import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import folioData from './folioData.json';
import './PortfolioChart.css'; // Import CSS file for styling

const PortfolioTableAndGraph = () => {
  const [stockData, setStockData] = useState(null);
  const [visibility, setVisibility] = useState({});
  
  useEffect(() => {
    // Fetch stock prices for each symbol
    const fetchStockData = async () => {
      try {
        const stockDataPromises = folioData.folio.plans.map(async (plan) => {
          const symbol = plan.stocks[0].symbol; // Assuming only one stock per plan
          const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=9dPUZYcQb2ivJ5Fz9Ep3PIlFiIVGGl5s`);
          if (!response.ok) {
            throw new Error('Failed to fetch stock data');
          }
          const json = await response.json();
          return { symbol, data: json.historical };
        });

        const fetchedStockData = await Promise.all(stockDataPromises);
        setStockData(fetchedStockData);
        const initialVisibility = {};
        fetchedStockData.forEach((data) => {
          initialVisibility[data.symbol] = true; // Initially, all lines are visible
        });
        setVisibility(initialVisibility);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  // Calculate returns for each plan
  const calculateReturns = (plan) => {
    if (!stockData) return [];

    const { symbol, buying_price, qty } = plan.stocks[0]; // Assuming only one stock per plan
    const stockInfo = stockData.find((stock) => stock.symbol === symbol);
    if (!stockInfo) return [];

    return stockInfo.data.map((entry) => {
      const returns = (entry.close - buying_price) * qty;
      return { date: entry.date, returns };
    });
  };

  // Handle toggle visibility of lines
  const handleToggleVisibility = (symbol) => {
    setVisibility({
      ...visibility,
      [symbol]: !visibility[symbol],
    });
  };

  if (!stockData) {
    return <div>Loading...</div>;
  }

  const plansReturns = folioData.folio.plans.map((plan) => ({
    name: plan.plan_name,
    data: calculateReturns(plan),
    symbol: plan.stocks[0].symbol,
  }));

  const totalReturns = plansReturns.reduce((acc, plan) => {
    return plan.data.map((entry, index) => ({
      ...entry,
      returns: (acc[index] ? acc[index].returns : 0) + entry.returns,
    }));
  }, []);

  return (
    <div className="portfolio-chart-container"> {/* Added container class */}
      <LineChart width={800} height={400} data={totalReturns}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {plansReturns.map((plan, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey="returns"
            data={plan.data}
            name={plan.name}
            stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Random color
            dot={false}
            connectNulls
            strokeOpacity={visibility[plan.symbol] ? 1 : 0} // Set stroke opacity based on visibility state
          />
        ))}
      </LineChart>
      <div className="checkbox-container" > {/* Added container class */}
        {plansReturns.map((plan, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={visibility[plan.symbol]}
              onChange={() => handleToggleVisibility(plan.symbol)}
            />
            {plan.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTableAndGraph;
