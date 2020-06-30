import * as types from './types';

const DEFAULT_FEED_STATE = {
  data: [],
  loading: false,
  error: false,
};

function feed(state = DEFAULT_FEED_STATE, action) {
  switch (action.type) {
    case types.CREATE_POST_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.CREATE_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    }

    case types.CREATE_POST_FAILURE: {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.SINGLE_USER_POSTS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.SINGLE_USER_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case types.SINGLE_USER_POSTS_FAILURE: {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    default:
      return state;
  }
}
export default feed;
