import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  styled,
  useTheme
} from '@mui/material';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const RebalancingRecommendations = () => {
  const recommendations = useSelector((state) => state.portfolio.rebalancingRecommendations);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Rebalancing Recommendations
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Suggestions to align your portfolio with target allocations
        </Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell align="right">Current Allocation</TableCell>
              <TableCell align="right">Target Allocation</TableCell>
              <TableCell align="right">Difference</TableCell>
              <TableCell align="right">Recommended Action</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendations.map((row) => (
              <TableRow
                key={row.asset}
                sx={{
                  backgroundColor:
                    Math.abs(row.difference) > 5
                      ? 'rgba(255, 0, 0, 0.05)'
                      : 'inherit'
                }}
              >
                <TableCell>{row.asset}</TableCell>
                <TableCell align="right">
                  {formatPercentage(row.currentAllocation)}
                </TableCell>
                <TableCell align="right">
                  {formatPercentage(row.targetAllocation)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      row.difference > 0
                        ? 'success.main'
                        : row.difference < 0
                        ? 'error.main'
                        : 'text.primary'
                  }}
                >
                  {formatPercentage(row.difference)}
                </TableCell>
                <TableCell align="right">{row.recommendation.action}</TableCell>
                <TableCell align="right">
                  {formatCurrency(row.recommendation.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RebalancingRecommendations;
