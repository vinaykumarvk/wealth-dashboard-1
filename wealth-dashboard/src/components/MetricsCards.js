import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%'
}));

const MetricsCards = () => {
  const metrics = useSelector((state) => state.portfolio.metrics);

  const metricsData = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(metrics.totalValue),
      change: formatPercentage(metrics.dailyChange)
    },
    {
      title: 'Total Gain/Loss',
      value: formatCurrency(metrics.totalGain),
      change: formatPercentage(metrics.gainPercentage)
    },
    {
      title: 'ROI',
      value: formatPercentage(metrics.roi),
      change: formatPercentage(metrics.roiChange)
    }
  ];

  return (
    <Grid container spacing={3}>
      {metricsData.map((metric, index) => (
        <Grid item xs={12} md={4} key={index}>
          <MetricCard>
            <Typography variant="subtitle2" color="textSecondary">
              {metric.title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ my: 1 }}>
              {metric.value}
            </Typography>
            <Typography
              variant="body2"
              color={parseFloat(metric.change) >= 0 ? 'success.main' : 'error.main'}
            >
              {metric.change}
            </Typography>
          </MetricCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsCards;
