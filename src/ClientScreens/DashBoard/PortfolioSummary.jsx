import React from "react";

const PortfolioSummary = ({ totalInvestment, portfolioValue, totalReturns, todayChange }) => {
  return (
    <div>
      <center><h2>Portfolio Summary</h2></center>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
      <p><strong>Total Invested Amount:</strong> <br/>${totalInvestment}</p>
      <p><strong>Current Portfolio Value:</strong> <br/>${totalReturns+totalInvestment}</p>
      <p><strong>Total Returns:</strong> <br/> ${totalReturns}</p>
      {/* <p>Today's Gain/Loss: ${todayChange}</p> */}
      </div>
    </div>
  );
};

export default PortfolioSummary;
