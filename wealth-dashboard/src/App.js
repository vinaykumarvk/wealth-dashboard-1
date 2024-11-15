import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Grid } from '@mui/material';
import { store } from './store/store';
import Header from './components/Header';
import MetricsCards from './components/MetricsCards';
import AllocationChart from './components/AllocationChart';
import PerformanceChart from './components/PerformanceChart';
import PortfolioTable from './components/PortfolioTable';

// Create theme with our brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1A2B4D',
    },
    secondary: {
      main: '#718096',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <MetricsCards />
            <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
              <Grid item xs={12} md={6}>
                <AllocationChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <PerformanceChart />
              </Grid>
            </Grid>
            <PortfolioTable />
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
