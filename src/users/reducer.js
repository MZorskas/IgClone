import * as types from './types';

const DEFAULT_USERS_STATE = {
  data: [],
  loading: false,
  error: false,
};

function users(state = DEFAULT_USERS_STATE, action) {
  switch (action.type) {
    case types.SINGLE_USER_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.SINGLE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    }

    case types.SINGLE_USER_FAILURE: {
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
export default users;
