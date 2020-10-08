import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './scss/main.scss';
import { Route, Switch } from 'react-router-dom';

//Modules
import authentication from '../authentication';

//Components
import PrivateRoute from './components/PrivateRoute';
import PageLayout from './components/PageLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Explore from './pages/Explore/Explore';
import Post from './pages/Post/Post';
import Accounts from './pages/Accounts/Accounts';
import history from './components/history';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(authentication.selectors.token);
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const { phoneNumber, email } = useSelector(
    authentication.selectors.getActiveUser
  );

  useEffect(() => {
    if (!isAuthorized && token) {
      dispatch(authentication.actions.loginUserWithStorage(token));
    }
  }, [isAuthorized, authentication, token]);

  useEffect(() => {
    console.log(phoneNumber);
    if (isAuthorized && !phoneNumber) {
      console.log('FIRST IF');
      history.replace('/register/phoneNumber/');
    }
    if (isAuthorized && !email) {
      console.log('SECOND IF');
      history.replace('/register/email/');
    }
  }, [isAuthorized, phoneNumber, email]);

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
        <Route exact path="/register/phoneNumber">
          <Register />
        </Route>
        <Route exact path="/register/email">
          <Register />
        </Route>
        <PrivateRoute exact path="/explore">
          <Explore />
        </PrivateRoute>
        <PrivateRoute exact path="/explore/people/suggested">
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
