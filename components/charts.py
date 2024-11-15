import plotly.graph_objects as go
import plotly.express as px
import numpy as np

def create_allocation_chart(portfolio_data):
    """Create asset allocation donut chart"""
    fig = go.Figure(data=[go.Pie(
        labels=portfolio_data['allocation']['labels'],
        values=portfolio_data['allocation']['values'],
        hole=.4,
        marker_colors=['#1A2B4D', '#38A169', '#718096', '#4299E1', '#805AD5']
    )])
    
    fig.update_layout(
        showlegend=True,
        legend=dict(orientation="h"),
        margin=dict(t=0, b=0, l=0, r=0),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    
    return fig

def create_performance_chart(portfolio_data):
    fig = go.Figure()
    
    # Portfolio value trace
    fig.add_trace(go.Scatter(
        x=portfolio_data['performance']['dates'],
        y=portfolio_data['performance']['values'],
        mode='lines',
        name='Portfolio Value',
        line=dict(color='#1A2B4D', width=2)
    ))
    
    # S&P 500 benchmark trace
    benchmark_values = [val * 0.95 + val * 0.1 * np.random.random() 
                       for val in portfolio_data['performance']['values']]
    fig.add_trace(go.Scatter(
        x=portfolio_data['performance']['dates'],
        y=benchmark_values,
        mode='lines',
        name='S&P 500',
        line=dict(color='#718096', width=2, dash='dash')
    ))
    
    fig.update_layout(
        xaxis_title="Date",
        yaxis_title="Value ($)",
        hovermode='x unified',
        margin=dict(t=0, b=0, l=0, r=0),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        yaxis_gridcolor='#f0f0f0',
        xaxis_gridcolor='#f0f0f0',
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1
        )
    )
    
    return fig
