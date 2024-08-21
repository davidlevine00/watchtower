import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Email', value: 400 },
  { name: 'Facebook', value: 300 },
  { name: 'Google', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AcquisitionCostChart = () => (
  <PieChart width={400} height={400}>
    <Pie data={data} dataKey="value" nameKey="name" outerRadius={150} fill="#8884d8">
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);

export default AcquisitionCostChart;
