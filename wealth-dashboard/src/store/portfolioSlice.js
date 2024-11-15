import { createSlice } from '@reduxjs/toolkit';
import { portfolioData, calculateMetrics } from '../data/sampleData';

const initialState = {
  data: portfolioData,
  metrics: calculateMetrics(portfolioData),
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
