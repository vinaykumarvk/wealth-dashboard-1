import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const RiskMetrics = () => {
  const metrics = useSelector((state) => state.portfolio.metrics);

  const riskMetrics = [
    {
      title: 'Volatility',
      value: `${metrics.volatility.toFixed(2)}%`,
      description: 'Annual portfolio volatility'
    },
    {
      title: 'Beta',
      value: metrics.beta.toFixed(2),
      description: 'Market sensitivity'
    },
    {
      title: 'Sharpe Ratio',
      value: metrics.sharpeRatio.toFixed(2),
      description: 'Risk-adjusted return'
    },
    {
      title: 'Max Drawdown',
      value: `${metrics.maxDrawdown.toFixed(2)}%`,
      description: 'Largest peak-to-trough decline'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {riskMetrics.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.title}>
          <MetricCard>
            <Typography variant="subtitle2" color="textSecondary" align="center">
              {metric.title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ my: 1 }}>
              {metric.value}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {metric.description}
            </Typography>
          </MetricCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default RiskMetrics;
