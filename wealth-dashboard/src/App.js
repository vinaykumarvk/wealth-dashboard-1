import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Grid, Button, Modal } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { store } from './store/store';
import Header from './components/Header';
import MetricsCards from './components/MetricsCards';
import AllocationChart from './components/AllocationChart';
import PerformanceChart from './components/PerformanceChart';
import PortfolioTable from './components/PortfolioTable';
import RebalancingRecommendations from './components/RebalancingRecommendations';
import RiskMetrics from './components/RiskMetrics';
import PDFReport from './components/PDFReport';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden'
};

function App() {
  const [openPDFModal, setOpenPDFModal] = useState(false);

  const handleOpenPDFModal = () => setOpenPDFModal(true);
  const handleClosePDFModal = () => setOpenPDFModal(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', width: '100%' }}>
          <Header />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                onClick={handleOpenPDFModal}
              >
                Generate PDF Report
              </Button>
            </Box>
            <MetricsCards />
            <RiskMetrics />
            <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
              <Grid item xs={12} md={6}>
                <AllocationChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <PerformanceChart />
              </Grid>
            </Grid>
            <PortfolioTable />
            <RebalancingRecommendations />
            <Modal
              open={openPDFModal}
              onClose={handleClosePDFModal}
              aria-labelledby="pdf-report-modal"
            >
              <Box sx={modalStyle}>
                <PDFViewer style={{ width: '100%', height: '100%' }}>
                  <PDFReport />
                </PDFViewer>
              </Box>
            </Modal>
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
