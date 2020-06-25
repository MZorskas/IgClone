import React from 'react';
import './index.scss';
import { Route, Switch } from 'react-router-dom';

import PageLayout from './components/PageLayout/index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
// import Content from './pages/Content/Content';
// import Favorites from './pages/Favorites/Favorites';
// import PrivateRoute from './components/PrivateRoute';
// import Movie from './pages/Movie/Movie';
// import history from './components/history';

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
        <Route exact path="/profile/edit">
          <EditProfile />
        </Route>
        {/* <Route exact path="/:username">
          <Profile />
        </Route> */}
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </PageLayout>
  );
}

export default App;
