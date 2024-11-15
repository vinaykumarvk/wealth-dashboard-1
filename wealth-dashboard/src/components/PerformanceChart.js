import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { formatCurrency } from '../utils/formatters';

const PerformanceChart = () => {
  const { performance } = useSelector((state) => state.portfolio.data);
  
  const data = performance.dates.map((date, index) => ({
    date: new Date(date).toLocaleDateString(),
    value: performance.values[index]
  }));

  // Calculate min and max values with margin
  const minValue = Math.min(...performance.values);
  const maxValue = Math.max(...performance.values);
  const margin = (maxValue - minValue) * 0.1; // 10% margin

  return (
    <Paper sx={{ p: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Portfolio Value History
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
            width={80}
            domain={[minValue - margin, maxValue + margin]}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#1A2B4D" 
            name="Portfolio Value"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default PerformanceChart;
