import  { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, Label, LineChart, Line } from 'recharts';
import '../Profilepage/style.css';
export const TotalInvestmentReturnsCard = ({ folioData }) => {
  let totalInvestment = 0;
  let totalReturns = 0;

  folioData.folio.plans.forEach((plan) => {
    totalInvestment += plan.amount;
    plan.stocks.forEach((stock) => {
      stock.past10daysreturns.forEach((returnRate) => {
        totalReturns += returnRate * stock.qty * stock.buying_price;
      });
    });
  });

  return (
    <div className="card">
      <div className="card-header">Total Investment and Returns</div>
      <div className="card-body">
        <p>Total Investment: ${totalInvestment}</p>
        <p>Total Returns: ${totalReturns}</p>
      </div>
    </div>
  );
};

export const InvestmentDistributionCard = ({ folioData }) => {
  const data = folioData.folio.plans.map((plan) => ({
    name: plan.plan_name,
    value: plan.amount,
  }));

  return (
    <div className="card">
      <div className="card-header">Investment Distribution</div>
      <div className="card-body">
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
            <Label width={30} position="center">
              Total
            </Label>
            <Tooltip />
          </Pie>
          <Legend />
          {data.map((entry, index) => (
            <Label
              key={`label-${index}`}
              value={`${entry.name}: ${entry.value}`}
              position="bottom"
              style={{ fontSize: '12px' }}
            />
          ))}
        </PieChart>
      </div>
    </div>
  );
};

export const TotalReturnsBarChart = ({ folioData }) => {
  const totalReturnsData = folioData.folio.plans.map((plan) => ({
    plan_name: plan.plan_name,
    total_returns: plan.stocks.reduce((total, stock) => {
      return total + stock.past10daysreturns.reduce((acc, returnRate) => {
        return acc + (returnRate * stock.qty * stock.buying_price);
      }, 0);
    }, 0),
  }));

  return (
    <div className="card">
      <div className="card-header" style={{ marginLeft: "2vw", marginRight: "2vw" }}>Total Returns of Each Plan</div>
      <div className="card-body">
        <BarChart
          width={400}
          height={240}
          data={totalReturnsData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="plan_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_returns" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export const ReturnsTimeSeriesGraph = ({ folioData }) => {
  const [hiddenLines, setHiddenLines] = useState({});

  const handleCheckboxChange = (planName) => {
    setHiddenLines((prevHiddenLines) => ({
      ...prevHiddenLines,
      [planName]: !prevHiddenLines[planName],
    }));
  };

  const combinedReturns = [];
  folioData.folio.plans.forEach((plan) => {
    plan.stocks.forEach((stock) => {
      stock.past10daysreturns.forEach((returnRate, index) => {
        if (combinedReturns[index]) {
          combinedReturns[index].date = index;
          combinedReturns[index][plan.plan_name] = combinedReturns[index][plan.plan_name]
            ? combinedReturns[index][plan.plan_name] + (returnRate * stock.qty * stock.buying_price)
            : (returnRate * stock.qty * stock.buying_price);
        } else {
          const newObj = { date: index };
          newObj[plan.plan_name] = returnRate * stock.qty * stock.buying_price;
          combinedReturns.push(newObj);
        }
      });
    });
  });

  combinedReturns.forEach((dataPoint) => {
    let totalPortfolioReturns = 0;
    folioData.folio.plans.forEach((plan) => {
      if (dataPoint[plan.plan_name]) {
        totalPortfolioReturns += dataPoint[plan.plan_name];
      }
    });
    dataPoint['Total Portfolio Returns'] = totalPortfolioReturns;
  });

  return (
    <div className="card">
      <div className="card-header" style={{ marginLeft: "2vw", marginRight: "2vw" }}>Returns Time Series</div>
      <div className="card-body">
        <div>
          {folioData.folio.plans.map((plan) => (
            <span key={plan.plan_id}>
              <input
                type="checkbox"
                id={plan.plan_name}
                checked={!hiddenLines[plan.plan_name]}
                onChange={() => handleCheckboxChange(plan.plan_name)}
              />
              <label htmlFor={plan.plan_name}>{plan.plan_name}</label>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
          <div>
            <input
              type="checkbox"
              id="Total Portfolio Returns"
              checked={!hiddenLines['Total Portfolio Returns']}
              onChange={() => handleCheckboxChange('Total Portfolio Returns')}
            />
            <label htmlFor="Total Portfolio Returns">Total Portfolio Returns</label>
          </div>
        </div>
        <LineChart
          width={400}
          height={240}
          data={combinedReturns}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {folioData.folio.plans.map((plan) => (
            !hiddenLines[plan.plan_name] && (
              <Line
                type="monotone"
                dataKey={plan.plan_name}
                key={plan.plan_id}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            )
          ))}
          {!hiddenLines['Total Portfolio Returns'] && (
            <Line
              type="monotone"
              dataKey="Total Portfolio Returns"
              key="Total Portfolio Returns"
              stroke="#000000"
            />
          )}
        </LineChart>
      </div>
    </div>
  );
};

export const PlanDetails = ({ folioData }) => {
  const [expandedPlan, setExpandedPlan] = useState(null);

  const handlePlanClick = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <div className="card">
      <div className="card-header">Plan Details</div>
      <div className="card-body">
        {folioData.folio.plans.map((plan) => (
          <div key={plan.plan_id} style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => handlePlanClick(plan.plan_id)}>
            <h2>{plan.plan_name}</h2>
            {expandedPlan === plan.plan_id && (
              <div>
                <p>Plan ID: {plan.plan_id}</p>
                <p>Advisor ID: {plan.advisor_id}</p>
                <p>Purchase Date: {plan.purchase_date}</p>
                <p>Amount: ${plan.amount}</p>
                <h3>Stocks:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Quantity</th>
                      <th>Buying Price</th>
                      <th>Past 10 Days Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.stocks.map((stock) => (
                      <tr key={stock.symbol}>
                        <td>{stock.symbol}</td>
                        <td>{stock.qty}</td>
                        <td>${stock.buying_price}</td>
                        <td>
                          <ul>
                            {stock.past10daysreturns.map((returnRate, index) => (
                              <li key={index}>{returnRate}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};