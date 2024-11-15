import streamlit as st
import pandas as pd

def display_portfolio_summary(portfolio_data):
    # Create DataFrame and drop any rows where all values are NaN
    df = pd.DataFrame(portfolio_data['holdings'])
    df = df.dropna(how='all').reset_index(drop=True)
    
    # Style the dataframe with number formatting
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
        height=300  # Reduced height since we removed blank rows
    )
