import React from 'react';
import { Table } from 'antd';

const PlanTable = ({ uniquePlans, totalInvestments }) => {
    const columns = [
        {
            title: 'Plan ID',
            dataIndex: 'planId',
            key: 'planId',
        },
        {
            title: 'Total Amount Invested',
            dataIndex: 'totalInvestment',
            key: 'totalInvestment',
        },
    ];

    const data = uniquePlans.map(planId => ({
        planId: planId,
        totalInvestment: totalInvestments.get(planId),
    }));

    return (
        <Table columns={columns} dataSource={data} />
    );
};

export default PlanTable;
