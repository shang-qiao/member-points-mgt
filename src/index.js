import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './router';
import './index.css';
import './mock/rules-setting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
      {/* <Home routerview={<Routes/>}>
      </Home> */}
    </BrowserRouter>

  </React.StrictMode>
);
