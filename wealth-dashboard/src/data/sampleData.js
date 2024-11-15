const generatePerformanceData = () => {
  const dates = [];
  const values = [];
  const initialValue = 400000;
  
  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (365 - i));
    dates.push(date.toISOString());
    
    // Generate smoother value progression
    const trend = i / 365 * 0.15; // 15% annual growth trend
    const variation = (Math.random() - 0.5) * 0.02; // Small random variations
    values.push(initialValue * (1 + trend + variation));
  }
  
  return { dates, values };
};

export const portfolioData = {
  holdings: [
    {
      asset: 'US Stocks',
      currentValue: 250000,
      purchasePrice: 200000,
      gainLoss: 50000,
      weight: 50,
      return: 25
    },
    {
      asset: 'International Stocks',
      currentValue: 100000,
      purchasePrice: 90000,
      gainLoss: 10000,
      weight: 20,
      return: 11.11
    },
    {
      asset: 'Bonds',
      currentValue: 75000,
      purchasePrice: 72000,
      gainLoss: 3000,
      weight: 15,
      return: 4.17
    },
    {
      asset: 'Real Estate',
      currentValue: 50000,
      purchasePrice: 45000,
      gainLoss: 5000,
      weight: 10,
      return: 11.11
    },
    {
      asset: 'Cash',
      currentValue: 25000,
      purchasePrice: 25000,
      gainLoss: 0,
      weight: 5,
      return: 0
    }
  ],
  allocation: {
    labels: ['US Stocks', 'International Stocks', 'Bonds', 'Real Estate', 'Cash'],
    values: [50, 20, 15, 10, 5]
  },
  performance: generatePerformanceData()
};

export const calculateMetrics = (data) => {
  const totalValue = data.holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
  const totalCost = data.holdings.reduce((sum, holding) => sum + holding.purchasePrice, 0);
  const performance = data.performance;
  
  return {
    totalValue,
    totalGain: totalValue - totalCost,
    dailyChange: ((performance.values[performance.values.length - 1] - 
                  performance.values[performance.values.length - 2]) / 
                  performance.values[performance.values.length - 2] * 100),
    gainPercentage: ((totalValue - totalCost) / totalCost * 100),
    roi: ((totalValue - totalCost) / totalCost * 100),
    roiChange: ((performance.values[performance.values.length - 1] - performance.values[0]) / 
                performance.values[0] * 100)
  };
};
