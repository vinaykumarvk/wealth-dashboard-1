import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// Add error boundary
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', {
    message,
    source,
    lineno,
    colno,
    error
  });
  return false;
};

// Add React error boundary
if (process.env.NODE_ENV !== 'production') {
  const logError = (error, errorInfo) => {
    console.error('React error:', error);
    console.error('Error info:', errorInfo);
  };

  root.render(
    <React.StrictMode>
      <ErrorBoundary onError={logError}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

