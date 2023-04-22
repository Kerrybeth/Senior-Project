import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Card, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function ErrorFallback({ error }) {
  return (
    <>
      <Card sx={{ m: 1, p: 2 }} elevation={1}>
        <p>Oh no! Something went really wrong with CalandarBoard, here's what I know:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </Card>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline enableColorScheme />
            <App />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

