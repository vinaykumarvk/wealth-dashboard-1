export const calculateRebalancingRecommendations = (holdings, targetAllocation) => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
  
  // Calculate current vs target allocation differences
  const recommendations = holdings.map(holding => {
    const currentWeight = (holding.currentValue / totalValue) * 100;
    const targetWeight = targetAllocation[holding.asset] || currentWeight;
    const difference = targetWeight - currentWeight;
    const amountToAdjust = (Math.abs(difference) * totalValue) / 100;
    
    return {
      asset: holding.asset,
      currentAllocation: currentWeight,
      targetAllocation: targetWeight,
      difference: difference,
      recommendation: difference > 1 ? {
        action: 'Buy',
        amount: amountToAdjust
      } : difference < -1 ? {
        action: 'Sell',
        amount: amountToAdjust
      } : {
        action: 'Hold',
        amount: 0
      }
    };
  });

  return recommendations;
};
