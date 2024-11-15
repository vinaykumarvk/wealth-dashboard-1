// Risk analysis utility functions
const calculateStandardDeviation = (returns) => {
  const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
  const squaredDiffs = returns.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / returns.length;
  return Math.sqrt(variance);
};

const calculateSharpeRatio = (returns, riskFreeRate = 0.035) => {
  const meanReturn = returns.reduce((sum, val) => sum + val, 0) / returns.length;
  const excessReturn = meanReturn - (riskFreeRate / 252); // Daily risk-free rate
  const stdDev = calculateStandardDeviation(returns);
  return (stdDev === 0) ? 0 : (excessReturn / stdDev) * Math.sqrt(252); // Annualized
};

const calculateBeta = (portfolioReturns, marketReturns) => {
  const portfolioMean = portfolioReturns.reduce((sum, val) => sum + val, 0) / portfolioReturns.length;
  const marketMean = marketReturns.reduce((sum, val) => sum + val, 0) / marketReturns.length;
  
  const covariance = portfolioReturns.reduce((sum, val, i) => 
    sum + (val - portfolioMean) * (marketReturns[i] - marketMean), 0) / portfolioReturns.length;
  
  const marketVariance = marketReturns.reduce((sum, val) => 
    sum + Math.pow(val - marketMean, 2), 0) / marketReturns.length;
  
  return covariance / marketVariance;
};

const calculateMaxDrawdown = (values) => {
  let maxDrawdown = 0;
  let peak = values[0];
  
  for (let i = 1; i < values.length; i++) {
    if (values[i] > peak) {
      peak = values[i];
    } else {
      const drawdown = (peak - values[i]) / peak;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
  }
  
  return maxDrawdown;
};

// Export all functions
export {
  calculateStandardDeviation,
  calculateBeta,
  calculateSharpeRatio,
  calculateMaxDrawdown
};
