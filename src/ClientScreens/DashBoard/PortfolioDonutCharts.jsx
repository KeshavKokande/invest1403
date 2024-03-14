import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const PortfolioDonutCharts = ({ planInvestments, planReturns }) => {
  const renderDonutChart = (data, dataName) => {
    const dataValues = Object.entries(data);
    return (
      <div key={dataName} className="donut-chart">
        <h2>{dataName}</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={dataValues}
            dataKey={([key, value]) => ({ name: key, value })}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {dataValues.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  };

  return (
    <div className="portfolio-donut-charts">
      {renderDonutChart(planInvestments, 'Total Investment Distribution')}
      {renderDonutChart(planReturns, 'Total Returns Distribution')}
    </div>
  );
};

export default PortfolioDonutCharts;
