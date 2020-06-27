import React from 'react';
import './index.scss';
import { Route, Switch } from 'react-router-dom';

//Redux State
import { Provider } from 'react-redux';
import store from './state';

//Components
import PageLayout from './components/PageLayout/index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Provider store={store}>
      <PageLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </PageLayout>
    </Provider>
  );
}

export default App;
