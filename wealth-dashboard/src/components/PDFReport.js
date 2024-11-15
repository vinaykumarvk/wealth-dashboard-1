import React from 'react';
import { useSelector } from 'react-redux';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 24,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  metricBox: {
    width: '50%',
    padding: 5,
  },
  date: {
    fontSize: 10,
    marginTop: 20,
    textAlign: 'right',
  },
});

const PDFReport = () => {
  const { data, metrics } = useSelector((state) => state.portfolio);
  const currentDate = new Date().toLocaleDateString();

  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Portfolio Report</Text>
            <Text style={styles.text}>Generated on: {currentDate}</Text>

            {/* Portfolio Overview */}
            <Text style={styles.subtitle}>Portfolio Overview</Text>
            <View style={styles.metricsGrid}>
              <View style={styles.metricBox}>
                <Text style={styles.text}>Total Value: {formatCurrency(metrics.totalValue)}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.text}>Total Gain/Loss: {formatCurrency(metrics.totalGain)}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.text}>ROI: {formatPercentage(metrics.roi)}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.text}>Daily Change: {formatPercentage(metrics.dailyChange)}</Text>
              </View>
            </View>

            {/* Risk Metrics */}
            <Text style={styles.subtitle}>Risk Analysis</Text>
            <View style={styles.metricsGrid}>
              <View style={styles.metricBox}>
                <Text style={styles.text}>Volatility: {metrics.volatility.toFixed(2)}%</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.text}>Beta: {metrics.beta.toFixed(2)}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.text}>Sharpe Ratio: {metrics.sharpeRatio.toFixed(2)}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.text}>Max Drawdown: {metrics.maxDrawdown.toFixed(2)}%</Text>
              </View>
            </View>

            {/* Holdings Table */}
            <Text style={styles.subtitle}>Portfolio Holdings</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Asset</Text>
                <Text style={styles.tableCell}>Value</Text>
                <Text style={styles.tableCell}>Weight</Text>
                <Text style={styles.tableCell}>Return</Text>
              </View>
              {data.holdings.map((holding, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{holding.asset}</Text>
                  <Text style={styles.tableCell}>{formatCurrency(holding.currentValue)}</Text>
                  <Text style={styles.tableCell}>{formatPercentage(holding.weight)}</Text>
                  <Text style={styles.tableCell}>{formatPercentage(holding.return)}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.date}>
              Report generated by Wealth Management Dashboard
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFReport;
