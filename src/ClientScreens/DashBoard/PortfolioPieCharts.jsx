import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const PortfolioPieCharts = ({ plansData }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <h4>Total Investment Distribution</h4>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={plansData}
              dataKey="amount"
              nameKey="planName"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {plansData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4>Total Returns Distribution</h4>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={plansData}
              dataKey="returns"
              nameKey="planName"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {plansData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioPieCharts;
