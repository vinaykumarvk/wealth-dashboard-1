import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CircularProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { pdf } from '@react-pdf/renderer';
import PDFReport from './PDFReport';

const PDFGenerator = () => {
  const portfolioData = useSelector((state) => state.portfolio);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      const document = <PDFReport data={portfolioData.data} metrics={portfolioData.metrics} />;
      const blob = await pdf(document).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      sx={{ mb: 2 }}
    >
      {isGenerating ? 'Generating PDF...' : 'Download PDF Report'}
    </Button>
  );
};

export default PDFGenerator;
