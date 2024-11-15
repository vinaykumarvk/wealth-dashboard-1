import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  section: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  cell: {
    flex: 1,
    padding: 5
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666'
  }
});

const PDFReport = React.memo(({ data, metrics }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Portfolio Report</Text>
        <Text>Generated on: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Portfolio Overview</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Total Value: {formatCurrency(metrics.totalValue)}</Text>
          <Text style={styles.cell}>Total Gain/Loss: {formatCurrency(metrics.totalGain)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>ROI: {formatPercentage(metrics.roi)}</Text>
          <Text style={styles.cell}>Daily Change: {formatPercentage(metrics.dailyChange)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Risk Analysis</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Volatility: {metrics.volatility.toFixed(2)}%</Text>
          <Text style={styles.cell}>Beta: {metrics.beta.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Sharpe Ratio: {metrics.sharpeRatio.toFixed(2)}</Text>
          <Text style={styles.cell}>Max Drawdown: {metrics.maxDrawdown.toFixed(2)}%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Portfolio Holdings</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, { flex: 2 }]}>Asset</Text>
          <Text style={styles.cell}>Value</Text>
          <Text style={styles.cell}>Weight</Text>
          <Text style={styles.cell}>Return</Text>
        </View>
        {data.holdings.map((holding, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 2 }]}>{holding.asset}</Text>
            <Text style={styles.cell}>{formatCurrency(holding.currentValue)}</Text>
            <Text style={styles.cell}>{formatPercentage(holding.weight)}</Text>
            <Text style={styles.cell}>{formatPercentage(holding.return)}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        Report generated by Wealth Management Dashboard
      </Text>
    </Page>
  </Document>
));

export default PDFReport;
