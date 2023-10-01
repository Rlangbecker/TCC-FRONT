import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import AppRouter from './router/AppRouter.js';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
