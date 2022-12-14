import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/home';
import { BrowserRouter } from 'react-router-dom';
import Routes from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Home routerview={<Routes/>}>
      </Home>
    </BrowserRouter>

  </React.StrictMode>
);
