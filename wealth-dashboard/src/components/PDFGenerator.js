import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { pdf } from '@react-pdf/renderer';
import PDFReport from './PDFReport';

const PDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const portfolio = useSelector((state) => state.portfolio);

  const handleGeneratePDF = useCallback(async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      const blob = await pdf(<PDFReport portfolio={portfolio} />).toBlob();
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
  }, [portfolio, isGenerating]);

  return (
    <Button
      variant="contained"
      startIcon={<PictureAsPdfIcon />}
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      sx={{ mb: 2 }}
    >
      {isGenerating ? 'Generating PDF...' : 'Download PDF Report'}
    </Button>
  );
};

export default PDFGenerator;
