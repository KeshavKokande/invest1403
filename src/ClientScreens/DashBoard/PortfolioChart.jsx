import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PortfolioCharts = ({ data }) => {
  const [selectedPlans, setSelectedPlans] = useState({});

  const handleCheckboxChange = (planId) => {
    setSelectedPlans((prevSelectedPlans) => ({
      ...prevSelectedPlans,
      [planId]: !prevSelectedPlans[planId],
    }));
  };

  return (
    <div className="portfolio-charts-container">
      <div className="table-container">
        <h2>Plan Returns</h2>
        <table>
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Return (%)</th>
              <th>Visible</th>
            </tr>
          </thead>
          <tbody>
            {data.folio.plans.map((plan) => (
              <tr key={plan.plan_id}>
                <td>{plan.plan_name}</td>
                <td>{data.planReturns[plan.plan_id]}%</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPlans[plan.plan_id]}
                    onChange={() => handleCheckboxChange(plan.plan_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-container">
        <h2>Portfolio Performance</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data.historicalData['77777']} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.folio.plans.map((plan) => (
              selectedPlans[plan.plan_id] && (
                <Line
                  key={plan.plan_id}
                  type="monotone"
                  dataKey={plan.plan_name}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  dot={false}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioCharts;
