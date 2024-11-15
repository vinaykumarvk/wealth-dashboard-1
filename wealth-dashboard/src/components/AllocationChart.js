import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';

const COLORS = ['#1A2B4D', '#38A169', '#718096', '#4299E1', '#805AD5'];

const AllocationChart = () => {
  const { allocation } = useSelector((state) => state.portfolio.data);
  
  const data = allocation.labels.map((label, index) => ({
    name: label,
    value: allocation.values[index]
  }));

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Asset Allocation
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value}%`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default AllocationChart;
