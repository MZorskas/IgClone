import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { Router } from 'react-router-dom';
import history from './app/components/history';

//Redux State
import { Provider } from 'react-redux';
import store from './app/state';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,

  document.getElementById('root')
);
