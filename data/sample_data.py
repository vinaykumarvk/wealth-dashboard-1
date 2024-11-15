import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def get_portfolio_data():
    """Generate sample portfolio data"""
    # Generate sample holdings data
    holdings = [
        {
            'Asset': 'US Stocks',
            'Current Value': 250000,
            'Purchase Price': 200000,
            'Gain/Loss': 50000,
            'Weight': 50,
            'Return': 25
        },
        {
            'Asset': 'International Stocks',
            'Current Value': 100000,
            'Purchase Price': 90000,
            'Gain/Loss': 10000,
            'Weight': 20,
            'Return': 11.11
        },
        {
            'Asset': 'Bonds',
            'Current Value': 75000,
            'Purchase Price': 72000,
            'Gain/Loss': 3000,
            'Weight': 15,
            'Return': 4.17
        },
        {
            'Asset': 'Real Estate',
            'Current Value': 50000,
            'Purchase Price': 45000,
            'Gain/Loss': 5000,
            'Weight': 10,
            'Return': 11.11
        },
        {
            'Asset': 'Cash',
            'Current Value': 25000,
            'Purchase Price': 25000,
            'Gain/Loss': 0,
            'Weight': 5,
            'Return': 0
        }
    ]
    
    # Generate sample allocation data
    allocation = {
        'labels': ['US Stocks', 'International Stocks', 'Bonds', 'Real Estate', 'Cash'],
        'values': [50, 20, 15, 10, 5]
    }
    
    # Generate sample performance data
    dates = pd.date_range(end=datetime.now(), periods=365).tolist()
    initial_value = 400000
    np.random.seed(42)
    random_walk = np.random.normal(loc=0.0002, scale=0.001, size=365).cumsum()
    values = (initial_value * (1 + random_walk)).tolist()
    
    performance = {
        'dates': dates,
        'values': values
    }
    
    return {
        'holdings': holdings,
        'allocation': allocation,
        'performance': performance
    }
