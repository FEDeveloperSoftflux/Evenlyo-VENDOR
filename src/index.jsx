import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/global.css';
import VendorLogin from './auth/VendorLogin';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <VendorLogin />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

