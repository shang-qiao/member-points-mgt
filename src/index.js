import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './router';
import { Provider } from 'react-redux';
import store from './store';
import './i18n';
import './index.css';
// 注释 => 关闭mock
import './mock/rules-setting';
import './mock/points-setting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

