import React from 'react';
import { createRoot } from 'react-dom'; // Importe createRoot corretamente
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import AppRouter from './router/AppRouter.js';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
