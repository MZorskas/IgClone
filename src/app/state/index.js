import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authentication from '../../authentication';
import feed from '../../users';
import middleware from './middleware';
import users from '../../users';

const allMiddleWare =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const rootReducer = combineReducers({
  authentication: authentication.reducer,
  users: users.reducer,
  feed: feed.reducer,
});

const store = createStore(rootReducer, allMiddleWare);

export default store;
