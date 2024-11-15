import streamlit as st
import pandas as pd

def display_portfolio_summary(portfolio_data):
    df = pd.DataFrame(portfolio_data['holdings'])
    df = df.dropna(how='all').reset_index(drop=True)
    
    # Format the numeric columns before displaying
    df['Current Value'] = df['Current Value'].apply(lambda x: f'${x:,.2f}')
    df['Purchase Price'] = df['Purchase Price'].apply(lambda x: f'${x:,.2f}')
    df['Gain/Loss'] = df['Gain/Loss'].apply(lambda x: f'${x:,.2f}')
    df['Weight'] = df['Weight'].apply(lambda x: f'{x:.2f}%')
    df['Return'] = df['Return'].apply(lambda x: f'{x:.2f}%')
    
    st.dataframe(
        df,
        use_container_width=True,
        height=300,
        hide_index=True  # Using streamlit's built-in hide_index parameter
    )
