import { createSlice } from '@reduxjs/toolkit';
import { portfolioData, calculateMetrics } from '../data/sampleData';
import { calculateRebalancingRecommendations } from '../utils/portfolioUtils';

const targetAllocations = {
  'US Stocks': 45,
  'International Stocks': 25,
  'Bonds': 15,
  'Real Estate': 10,
  'Cash': 5
};

const initialState = {
  data: portfolioData,
  metrics: calculateMetrics(portfolioData),
  targetAllocations,
  rebalancingRecommendations: calculateRebalancingRecommendations(portfolioData.holdings, targetAllocations),
  loading: false,
  error: null
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolio: (state, action) => {
      state.data = action.payload;
      state.metrics = calculateMetrics(action.payload);
      state.rebalancingRecommendations = calculateRebalancingRecommendations(
        action.payload.holdings,
        state.targetAllocations
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { updatePortfolio, setLoading, setError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
