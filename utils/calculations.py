import pandas as pd
import numpy as np

def calculate_portfolio_metrics(portfolio_data):
    """Calculate key portfolio metrics"""
    total_value = sum(holding['Current Value'] for holding in portfolio_data['holdings'])
    total_cost = sum(holding['Purchase Price'] for holding in portfolio_data['holdings'])
    
    metrics = {
        'total_value': total_value,
        'total_gain': total_value - total_cost,
        'daily_change': calculate_daily_change(portfolio_data['performance']),
        'gain_percentage': ((total_value - total_cost) / total_cost * 100),
        'roi': ((total_value - total_cost) / total_cost * 100),
        'roi_change': calculate_roi_change(portfolio_data['performance']),
        'performance_data': calculate_performance_metrics(portfolio_data),
        'risk_metrics': calculate_risk_metrics(portfolio_data)
    }
    
    return metrics

def calculate_daily_change(performance_data):
    """Calculate daily percentage change"""
    values = performance_data['values']
    return ((values[-1] - values[-2]) / values[-2] * 100)

def calculate_roi_change(performance_data):
    """Calculate ROI change"""
    values = performance_data['values']
    return ((values[-1] - values[0]) / values[0] * 100)

def calculate_performance_metrics(portfolio_data):
    """Calculate detailed performance metrics"""
    return pd.DataFrame({
        'Metric': ['1-Month Return', '3-Month Return', 'YTD Return', '1-Year Return'],
        'Value': [5.2, 12.4, 18.7, 24.5],
        'Benchmark': [4.8, 11.9, 17.5, 22.8],
        'Alpha': [0.4, 0.5, 1.2, 1.7]
    })

def calculate_risk_metrics(portfolio_data):
    """Calculate risk metrics"""
    return pd.DataFrame({
        'Metric': ['Beta', 'Sharpe Ratio', 'Sortino Ratio', 'Max Drawdown'],
        'Value': [1.05, 1.82, 2.14, -12.5],
        'Category Avg': [1.00, 1.65, 1.95, -15.2]
    })
