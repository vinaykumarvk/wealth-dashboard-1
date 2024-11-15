import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { pdf } from '@react-pdf/renderer';
import PDFReport from './PDFReport';

const PDFGenerator = () => {
  const { data, metrics } = useSelector((state) => state.portfolio);

  const handleGeneratePDF = async () => {
    try {
      const blob = await pdf(<PDFReport data={data} metrics={metrics} />).toBlob();
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
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={<PictureAsPdfIcon />}
      onClick={handleGeneratePDF}
      sx={{ mb: 2 }}
    >
      Download PDF Report
    </Button>
  );
};

export default PDFGenerator;
