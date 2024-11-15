import streamlit as st
import plotly.graph_objects as go
from components.portfolio import display_portfolio_summary
from components.charts import create_allocation_chart, create_performance_chart
from data.sample_data import get_portfolio_data
from utils.calculations import calculate_portfolio_metrics

# Page configuration
st.set_page_config(
    page_title="Wealth Management Dashboard",
    page_icon="📈",
    layout="wide"
)

# Custom CSS
with open('styles/custom.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Header
st.markdown("<h1 class='main-header'>Wealth Management Dashboard</h1>", unsafe_allow_html=True)

# Get data
portfolio_data = get_portfolio_data()
metrics = calculate_portfolio_metrics(portfolio_data)

# Dashboard layout
col1, col2, col3 = st.columns(3)

# Key metrics
with col1:
    st.metric("Total Portfolio Value", f"${metrics['total_value']:,.2f}", 
              f"{metrics['daily_change']}%")
with col2:
    st.metric("Total Gain/Loss", f"${metrics['total_gain']:,.2f}", 
              f"{metrics['gain_percentage']}%")
with col3:
    st.metric("ROI", f"{metrics['roi']}%", 
              f"{metrics['roi_change']}%")

# Portfolio Summary
st.markdown("## Portfolio Overview")
display_portfolio_summary(portfolio_data)

# Charts
col1, col2 = st.columns(2)

with col1:
    st.markdown("### Asset Allocation")
    allocation_fig = create_allocation_chart(portfolio_data)
    st.plotly_chart(allocation_fig, use_container_width=True)

with col2:
    st.markdown("### Performance History")
    performance_fig = create_performance_chart(portfolio_data)
    st.plotly_chart(performance_fig, use_container_width=True)

# Investment Analytics
st.markdown("## Investment Analytics")
tab1, tab2 = st.tabs(["Performance Metrics", "Risk Analysis"])

with tab1:
    st.dataframe(metrics['performance_data'], use_container_width=True)

with tab2:
    st.dataframe(metrics['risk_metrics'], use_container_width=True)
