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
  Typography
} from '@mui/material';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const PortfolioTable = () => {
  const { holdings } = useSelector((state) => state.portfolio.data);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Portfolio Overview
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell align="right">Current Value</TableCell>
              <TableCell align="right">Purchase Price</TableCell>
              <TableCell align="right">Gain/Loss</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Return</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdings.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>{row.asset}</TableCell>
                <TableCell align="right">{formatCurrency(row.currentValue)}</TableCell>
                <TableCell align="right">{formatCurrency(row.purchasePrice)}</TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    color: row.gainLoss >= 0 ? 'success.main' : 'error.main'
                  }}
                >
                  {formatCurrency(row.gainLoss)}
                </TableCell>
                <TableCell align="right">{formatPercentage(row.weight)}</TableCell>
                <TableCell align="right">{formatPercentage(row.return)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PortfolioTable;
