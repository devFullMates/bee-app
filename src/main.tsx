import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Strict Mode: It's a good practice to use React.StrictMode during development, as it helps identify potential issues and encourages best practices. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
