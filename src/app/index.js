import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { Route, Switch } from 'react-router-dom';

//Modules
import authentication from '../authentication';

//Components
import PrivateRoute from './components/PrivateRoute';
import PageLayout from './components/PageLayout/index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Explore from './pages/Explore/Explore';
import Post from './pages/Post/Post';
import Accounts from './pages/Accounts/Accounts';

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(authentication.actions.loginUserWithStorage(token));
    }
  }, [isAuthorized, authentication, token]);

  return (
    <PageLayout>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/explore">
          <Explore />
        </PrivateRoute>
        <Route exact path="/:username">
          <Profile />
        </Route>
        <PrivateRoute exact path="/:username/saved/">
          <Profile />
        </PrivateRoute>
        <PrivateRoute exact path="/accounts/edit">
          <Accounts />
        </PrivateRoute>
        <PrivateRoute exact path="/accounts/password/change">
          <Accounts />
        </PrivateRoute>
        <Route exact path="/p/:postId">
          <Post />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </PageLayout>
  );
}

export default App;
