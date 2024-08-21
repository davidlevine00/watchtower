import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-08-01', revenue: 2400, profit: 2400 },
  { date: '2024-08-02', revenue: 1398, profit: 2210 },
  { date: '2024-08-03', revenue: 9800, profit: 2290 },
];

const RevenueProfitChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
);

export default RevenueProfitChart;
