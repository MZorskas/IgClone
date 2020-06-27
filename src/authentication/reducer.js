import * as types from './types';

const DEFAULT_AUTHENTICATION_STATE = {
  token: localStorage.getItem('x-auth-IG'),
  login: {
    error: null,
    loading: false,
  },
  logout: {
    error: null,
    loading: false,
  },
  register: {
    error: null,
    loading: false,
  },
};

function authentication(state = DEFAULT_AUTHENTICATION_STATE, action) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST: {
      return {
        ...state,
        login: {
          error: null,
          loading: true,
        },
      };
    }
    case types.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.payload.tokens.slice(-1)[0].token,
        login: {
          ...state.login,
          loading: false,
        },
      };
    }
    case types.USER_LOGIN_FAILURE: {
      console.log(action);
      return {
        ...state,
        login: {
          loading: false,
          error: action.payload.response,
        },
      };
    }
    case types.USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: true,
        },
      };
    }
    case types.USER_LOGOUT_FAILURE: {
      return {
        ...state,
        logout: {
          error: action.payload.message,
          loading: false,
        },
      };
    }
    case types.USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        logout: {
          ...state.logout,
          loading: false,
        },
      };
    }
    case types.USER_REGISTER_REQUEST: {
      return {
        ...state,
        register: {
          error: null,
          loading: true,
        },
      };
    }
    case types.USER_REGISTER_FAILURE: {
      return {
        ...state,
        register: {
          error: action.payload.response,
          loading: false,
        },
      };
    }
    case types.USER_REGISTER_SUCCESS: {
      return {
        ...state,
        token: action.payload.tokens.slice(-1)[0].token,
        register: {
          ...state.register,
          loading: false,
        },
      };
    }
    default:
      return state;
  }
}
export default authentication;
