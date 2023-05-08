import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Card, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { Typography } from '@mui/material';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function ErrorFallback({ error }) {
  const refresh = () => window.location.reload(true)

  return (
    <>
      <Card sx={{ m: 1, p: 4, height: "100%" }} elevation={1}>
        <p>Oh no! Something went really wrong with CalendarBoard, here's what I know:</p>
        <Typography sx={{ m: 1}} variant="body2" color="red">
        {error.message}
        </Typography>
        <button onClick={refresh}>Refresh</button>
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

