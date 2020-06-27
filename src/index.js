import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { Router } from 'react-router-dom';
import history from './app/components/history';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,

  document.getElementById('root')
);
