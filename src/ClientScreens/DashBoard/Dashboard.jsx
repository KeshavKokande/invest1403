import React, { useEffect, useState } from "react";
import PortfolioSummary from "./PortfolioSummary";
import PortfolioPieCharts from "./PortfolioPieCharts";
import folioData from "./folioData.json";
import PortfolioTableAndGraph from "./PortfolioTableAndGraph";
import PortfolioTable from "./Table";

const API_KEY = "9dPUZYcQb2ivJ5Fz9Ep3PIlFiIVGGl5s"; // Replace with your Financial Modeling Prep API key

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    portfolioValue:0,
    plansData: []
  });

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        let totalInvestment = 0;
        let totalReturns = 0;
        const plansData = [];

        for (const plan of folioData.folio.plans) {
          let planInvestment = 0;
          let planReturns = 0;

          for (const stock of plan.stocks) {
            const response = await fetch(
              `https://financialmodelingprep.com/api/v3/historical-price-full/${stock.symbol}?apikey=${API_KEY}`
            );
            const data = await response.json();
            const latestPrice = data.historical[0].close;

            planInvestment += stock.buying_price * stock.qty;
            planReturns += latestPrice * stock.qty - stock.buying_price * stock.qty;
          }

          totalInvestment += plan.amount;
          totalReturns += planReturns;


          plansData.push({
            planName: plan.plan_name,
            amount: plan.amount,
            returns: planReturns
          });
        }

        setPortfolioData({
          totalInvestment,
          totalReturns,
          plansData
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div>
      <PortfolioSummary
        totalInvestment={portfolioData.totalInvestment}
        portfolioValue={portfolioData.portfolioValue}
        totalReturns={portfolioData.totalReturns}
        todayChange={portfolioData.todayChange}
      />
      <hr/>
      <PortfolioPieCharts plansData={portfolioData.plansData} />
      <hr/>
      <PortfolioTableAndGraph/>
      <hr/>
      <PortfolioTable/>
    </div>
  );
};

export default Dashboard;
