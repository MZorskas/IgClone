import authentication from '../../../authentication';
import history from '../../components/history';

const authHandling = ({ dispatch, getState }) => (next) => (action) => {
  console.log('authHandling', { dispatch, getState, next, action, history });
  //   console.log('authHandling', action.error);
  if (action.type === authentication.types.USER_LOGIN_SUCCESS) {
    localStorage.setItem('x-auth-IG', action.payload.tokens.slice(-1)[0].token);
    history.replace(
      history.location.state ? history.location.state.referrer.pathname : '/'
    );
  }
  if (action.type === authentication.types.USER_LOGOUT_SUCCESS) {
    localStorage.removeItem('x-auth-IG');
    history.replace('/');
  }
  if (action.type === authentication.types.USER_REGISTER_SUCCESS) {
    localStorage.setItem('x-auth-IG', action.payload.tokens.slice(-1)[0].token);
    history.replace('/');
  }

  //   if (action === 401) {
  //     dispatch(authentication.actions.logout());
  //   }
  return next(action);
};

export default authHandling;
