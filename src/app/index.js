import React from 'react';
import './index.scss';
import { Route, Switch } from 'react-router-dom';

//Components
import PageLayout from './components/PageLayout/index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
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
  );
}

export default App;
