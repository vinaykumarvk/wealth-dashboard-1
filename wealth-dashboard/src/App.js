import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Container, CssBaseline, Grid } from '@mui/material';
import PerformanceChart from './components/PerformanceChart';
import PortfolioTable from './components/PortfolioTable';
import RebalancingRecommendation from './components/RebalancingRecommendation';
import RiskMetrics from './components/RiskMetrics';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006039', // Rolex Green
    },
    secondary: {
      main: '#A37E2C', // Rolex Gold
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#006039' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#A37E2C' }}>
              Wealth Insight Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Performance Chart */}
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 2, border: '1px solid #A37E2C', borderRadius: 1 }}>
                <PerformanceChart />
              </Box>
            </Grid>

            {/* Risk Metrics */}
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: '1px solid #A37E2C', borderRadius: 1 }}>
                <RiskMetrics />
              </Box>
            </Grid>

            {/* Portfolio Table */}
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 2, border: '1px solid #A37E2C', borderRadius: 1 }}>
                <PortfolioTable />
              </Box>
            </Grid>

            {/* Rebalancing Recommendation */}
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: '1px solid #A37E2C', borderRadius: 1 }}>
                <RebalancingRecommendation />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
