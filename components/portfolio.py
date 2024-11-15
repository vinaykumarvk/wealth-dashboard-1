import streamlit as st
import pandas as pd

def display_portfolio_summary(portfolio_data):
    """Display portfolio holdings in a formatted table"""
    df = pd.DataFrame(portfolio_data['holdings'])
    
    # Style the dataframe with basic formatting
    styled_df = df.style.format({
        'Current Value': '${:,.2f}',
        'Purchase Price': '${:,.2f}',
        'Gain/Loss': '${:,.2f}',
        'Weight': '{:.2f}%',
        'Return': '{:.2f}%'
    })
    
    st.dataframe(
        styled_df,
        use_container_width=True,
        height=400
    )
