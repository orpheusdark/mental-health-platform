import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Ensure there is NO basename prop here */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);