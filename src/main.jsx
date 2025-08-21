import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css'; // Add this new line for Pico

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="mental-health-platform">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);