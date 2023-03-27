import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Card, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom'

function ErrorFallback({ error }) {
  return (
    <>
      <Card sx={{ m: 1, p: 2 }} elevation={1}>
        <p>Something went really wrong with CalandarBoard, here what I know:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </Card>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <React.StrictMode>
      <Provider store={store}>
        <CssBaseline enableColorScheme />
        <App />
      </Provider>
    </React.StrictMode>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

