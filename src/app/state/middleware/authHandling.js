import authentication from '../../../authentication';
import users from '../../../users';
import feed from '../../../feed';
import history from '../../components/history';
import store from '../../state/index';

const authHandling = ({ dispatch, getState }) => (next) => (action) => {
  console.log('authHandling', { dispatch, getState, next, action, history });
  const activeUser = getState().authentication.activeUser;
  const token = getState().authentication.token;
  //   console.log('authHandling', action.error);
  if (action.type === authentication.types.USER_LOGIN_SUCCESS) {
    localStorage.setItem('x-auth-IG', action.payload.tokens.slice(-1)[0].token);
    //Laikinai, paskui bus su tokenu
    localStorage.setItem('token', action.payload.token);
    history.replace(
      history.location.state ? history.location.state.referrer.pathname : '/'
    );
  }

  if (action.type === authentication.types.USER_LOGIN_STORAGE_SUCCESS) {
    localStorage.setItem('x-auth-IG', action.payload.tokens.slice(-1)[0].token);
    //Laikinai, paskui bus su tokenu
    localStorage.setItem('token', action.payload.token);
  }
  if (action.type === authentication.types.USER_LOGOUT_SUCCESS) {
    localStorage.removeItem('x-auth-IG');
    history.replace('/');
  }
  if (action.type === authentication.types.USER_REGISTER_SUCCESS) {
    localStorage.setItem('x-auth-IG', action.payload.tokens.slice(-1)[0].token);
    history.replace('/');
  }

  if (action.type === feed.types.CREATE_POST_SUCCESS) {
    history.location.pathname !== `/${action.payload.user}` &&
      history.push(`/${action.payload.user}`);
  }

  if (action.type === feed.types.DELETE_POST_SUCCESS) {
    history.replace(`/${action.payload.user}`);
  }

  if (
    action.type === users.types.TOGGLE_FOLLOW_USER_SUCCESS &&
    action.payload.reqUserId === activeUser._id &&
    history.location.pathname === `/${activeUser.username}`
  ) {
    // console.log('TOGGLE_FOLLOW_USER_SUCCESS', getState().authentication.activeUser);
    console.log('TEISINGAI');
    dispatch(users.actions.fetchSingleUser(activeUser.username));
  }
  //   if (action === 401) {
  //     dispatch(authentication.actions.logout());
  //   }
  return next(action);
};

export default authHandling;
