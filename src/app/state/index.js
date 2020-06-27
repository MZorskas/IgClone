import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authentication from '../../authentication';
import middleware from './middleware';

const allMiddleWare =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const rootReducer = combineReducers({
  authentication: authentication.reducer,
});

const store = createStore(rootReducer, allMiddleWare);

export default store;
