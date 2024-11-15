import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import numpy as np
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure the page
try:
    st.set_page_config(
        page_title="Wealth Management Dashboard",
        page_icon="💰",
        layout="wide"
    )
except Exception as e:
    logger.error(f"Error configuring page: {str(e)}")
    st.error("Error initializing dashboard. Please try refreshing the page.")

# Sample data generation
def generate_portfolio_data():
    try:
        # Portfolio holdings
        holdings = pd.DataFrame({
            'Asset': ['US Stocks', 'International Stocks', 'Bonds', 'Real Estate', 'Cash'],
            'Current Value': [250000, 100000, 75000, 50000, 25000],
            'Purchase Price': [200000, 90000, 72000, 45000, 25000],
            'Weight': [50, 20, 15, 10, 5]
        })
        holdings['Gain/Loss'] = holdings['Current Value'] - holdings['Purchase Price']
        holdings['Return'] = (holdings['Gain/Loss'] / holdings['Purchase Price'] * 100).round(2)
        return holdings
    except Exception as e:
        logger.error(f"Error generating portfolio data: {str(e)}")
        return None

def generate_historical_data():
    try:
        dates = pd.date_range(end=datetime.now(), periods=365, freq='D')
        base_value = 400000
        
        # Generate random walk for portfolio value
        np.random.seed(42)
        returns = np.random.normal(loc=0.0002, scale=0.002, size=365)
        values = base_value * np.exp(np.cumsum(returns))
        
        return pd.DataFrame({'Date': dates, 'Value': values})
    except Exception as e:
        logger.error(f"Error generating historical data: {str(e)}")
        return None

try:
    # Generate data
    holdings = generate_portfolio_data()
    historical_data = generate_historical_data()

    if holdings is None or historical_data is None:
        st.error("Error generating dashboard data. Please try refreshing the page.")
    else:
        # Header
        st.title("Wealth Management Dashboard")

        # Metrics
        total_value = holdings['Current Value'].sum()
        total_gain = holdings['Gain/Loss'].sum()
        total_return = (total_gain / holdings['Purchase Price'].sum() * 100)

        # Display metrics in columns
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Total Portfolio Value", 
                f"${total_value:,.2f}", 
                f"{(historical_data['Value'].pct_change().iloc[-1]*100):+.2f}%"
            )
        with col2:
            st.metric(
                "Total Gain/Loss", 
                f"${total_gain:,.2f}", 
                f"{(total_gain/holdings['Purchase Price'].sum()*100):+.2f}%"
            )
        with col3:
            st.metric(
                "ROI", 
                f"{total_return:.2f}%",
                f"{(historical_data['Value'].iloc[-1]/historical_data['Value'].iloc[0]-1)*100:+.2f}%"
            )

        # Charts
        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Asset Allocation")
            fig_pie = px.pie(
                holdings, 
                values='Current Value', 
                names='Asset',
                hole=0.3,
                color_discrete_sequence=px.colors.sequential.Blues_r
            )
            st.plotly_chart(fig_pie, use_container_width=True)

        with col2:
            st.subheader("Performance History")
            fig_line = px.line(
                historical_data, 
                x='Date', 
                y='Value',
                title='Portfolio Value Over Time'
            )
            fig_line.update_layout(
                yaxis_tickprefix='$',
                showlegend=True,
                hovermode='x unified'
            )
            st.plotly_chart(fig_line, use_container_width=True)

        # Portfolio Table
        st.subheader("Portfolio Overview")
        st.dataframe(
            holdings.style.format({
                'Current Value': '${:,.2f}',
                'Purchase Price': '${:,.2f}',
                'Gain/Loss': '${:,.2f}',
                'Weight': '{:.1f}%',
                'Return': '{:+.2f}%'
            }),
            hide_index=True
        )

except Exception as e:
    logger.error(f"Error in main app execution: {str(e)}")
    st.error("An error occurred while loading the dashboard. Please try refreshing the page.")
