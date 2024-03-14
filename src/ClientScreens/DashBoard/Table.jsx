import React, { useState, useEffect } from 'react';
import { Table, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import folioData from './folioData.json'; // Importing the JSON data

const { RangePicker } = DatePicker;

const PortfolioTable = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState([]);
  const [returnsData, setReturnsData] = useState([]);

  useEffect(() => {
    if (selectedTimeFrame.length === 2) {
      calculateReturns(selectedTimeFrame[0], selectedTimeFrame[1]);
    }
  }, [selectedTimeFrame]);

  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'plan_name',
      key: 'plan_name',
    },
    {
      title: 'Advisor ID',
      dataIndex: 'advisor_id',
      key: 'advisor_id',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchase_date',
      key: 'purchase_date',
      render: date => moment(date, 'DDMMYYYY').format('DD/MM/YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: amount => `$${amount}`,
    },
    {
      title: 'Return',
      dataIndex: 'return',
      key: 'return',
      render: returnAmount => `$${returnAmount}`,
    },
  ];

  const fetchHistoricalData = async (symbol, startDate, endDate) => {
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${startDate}&to=${endDate}&apikey=9dPUZYcQb2ivJ5Fz9Ep3PIlFiIVGGl5s`
      );
      return response.data.historical;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  };

  const calculateReturns = async (startDate, endDate) => {
    const updatedReturnsData = await Promise.all(
      folioData.folio.plans.map(async (plan) => {
        let totalReturn = 0;
        for (const stock of plan.stocks) {
          const historicalData = await fetchHistoricalData(
            stock.symbol,
            moment(startDate).format('YYYY-MM-DD'),
            moment(endDate).format('YYYY-MM-DD')
          );
          if (historicalData.length > 0) {
            // Find the historical data for the end date
            const endDateData = historicalData.find(data => data.date === endDate.format('YYYY-MM-DD'));
            // Find the historical data for the purchase date
            const purchaseDateData = historicalData.find(data => data.date === plan.purchase_date);
            if (endDateData && purchaseDateData) {
              const endDatePrice = endDateData.close;
              const startDatePrice = purchaseDateData.close;
              const stockReturn = endDatePrice - startDatePrice;
              totalReturn += stockReturn * stock.qty;
            }
          }
        }
        return { ...plan, return: totalReturn.toFixed(2) };
      })
    );
    setReturnsData(updatedReturnsData);
  };

  const handleTimeFrameChange = (dates) => {
    setSelectedTimeFrame(dates);
  };

  return (
    <div>
      <RangePicker onChange={handleTimeFrameChange} />
      <Table
        dataSource={returnsData}
        columns={columns}
        pagination={false}
        rowKey="plan_id"
      />
    </div>
  );
};

export default PortfolioTable;
