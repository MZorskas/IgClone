import * as types from './types';

const DEFAULT_AUTHENTICATION_STATE = {
  token: localStorage.getItem('x-auth-IG'),
  activeUser: {
    _id: null,
    email: '',
    username: '',
    fullName: '',
    phoneNumber: '',
    dateOfBirth: '',
    createdAt: '',
    profilePicture: '',
    bio: '',
    following: [],
    followingCount: 0,
    followers: [],
    followersCount: 0,
    savedPosts: [],
    posts: [],
    postCount: 0,
    token: '',
  },
  login: {
    error: null,
    loading: false,
    storageLoading: false,
  },
  logout: {
    error: null,
    loading: false,
  },
  register: {
    error: null,
    loading: false,
  },
  addPhoneNumber: {
    error: null,
    loading: false,
  },
  addEmail: {
    error: null,
    loading: false,
  },
  editInfo: {
    error: null,
    loading: false,
    success: null,
  },
  changePassword: {
    error: null,
    loading: false,
    success: null,
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
        activeUser: {
          ...state.activeUser,
          _id: action.payload._id,
          email: action.payload.email,
          username: action.payload.username,
          fullName: action.payload.fullName,
          phoneNumber: action.payload.phoneNumber,
          dateOfBirth: action.payload.dateOfBirth,
          createdAt: action.payload.createdAt,
          profilePicture: action.payload.profilePicture,
          bio: action.payload.bio ? action.payload.bio : '',
          following: action.payload.following,
          followingCount: action.payload.followingCount,
          followers: action.payload.followers,
          followersCount: action.payload.followersCount,
          posts: action.payload.posts,
          postCount: action.payload.postCount,
          savedPosts: [],
          token: action.payload.token,
        },
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
    case types.USER_LOGIN_STORAGE_REQUEST: {
      return {
        ...state,
        login: {
          error: null,
          storageLoading: true,
        },
      };
    }
    case types.USER_LOGIN_STORAGE_SUCCESS: {
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          _id: action.payload._id,
          email: action.payload.email,
          username: action.payload.username,
          fullName: action.payload.fullName,
          phoneNumber: action.payload.phoneNumber,
          dateOfBirth: action.payload.dateOfBirth,
          createdAt: action.payload.createdAt,
          profilePicture: action.payload.profilePicture,
          bio: action.payload.bio ? action.payload.bio : '',
          following: action.payload.following,
          followingCount: action.payload.followingCount,
          followers: action.payload.followers,
          followersCount: action.payload.followersCount,
          posts: action.payload.posts,
          postCount: action.payload.postCount,
          savedPosts: action.payload.savedPosts,
          token: action.payload.token,
        },
        token: action.payload.tokens.slice(-1)[0].token,
        login: {
          ...state.login,
          storageLoading: false,
        },
      };
    }

    case types.USER_LOGIN_STORAGE_FAILURE: {
      console.log(action);
      return {
        ...state,
        login: {
          loading: false,
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

    // case types.USER_LOGOUT_SUCCESS: {
    //   return { token: null, ...DEFAULT_AUTHENTICATION_STATE, token: null };
    // }

    case types.USER_LOGOUT_SUCCESS: {
      return { ...DEFAULT_AUTHENTICATION_STATE, token: null };
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
        activeUser: {
          ...state.activeUser,
          _id: action.payload._id,
          email: action.payload.email,
          username: action.payload.username,
          fullName: action.payload.fullName,
          phoneNumber: action.payload.phoneNumber,
          dateOfBirth: action.payload.dateOfBirth,
          createdAt: action.payload.createdAt,
          profilePicture: action.payload.profilePicture,
          following: action.payload.following,
          followers: action.payload.followers,
          token: action.payload.token,
        },
        token: action.payload.tokens.slice(-1)[0].token,
        register: {
          ...state.register,
          loading: false,
        },
      };
    }

    case types.USER_ADD_EMAIL_REQUEST: {
      return {
        ...state,
        addEmail: {
          error: null,
          loading: true,
        },
      };
    }

    case types.USER_ADD_EMAIL_FAILURE: {
      return {
        ...state,
        addEmail: {
          error: action.payload.response,
          loading: false,
        },
      };
    }

    case types.USER_ADD_EMAIL_SUCCESS: {
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          email: action.payload.email,
        },
        addEmail: {
          ...state.addEmail,
          loading: false,
        },
      };
    }

    case types.USER_ADD_PHONE_NUMBER_REQUEST: {
      return {
        ...state,
        addPhoneNumber: {
          error: null,
          loading: true,
        },
      };
    }

    case types.USER_ADD_PHONE_NUMBER_FAILURE: {
      return {
        ...state,
        addPhoneNumber: {
          error: action.payload.response,
          loading: false,
        },
      };
    }

    case types.USER_ADD_PHONE_NUMBER_SUCCESS: {
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          phoneNumber: action.payload.phoneNumber,
        },
        addPhoneNumber: {
          ...state.addEmail,
          loading: false,
        },
      };
    }

    case types.USER_CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        changePassword: {
          error: null,
          loading: true,
          success: null,
        },
      };
    }

    case types.USER_CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        changePassword: {
          error: action.payload.response,
          loading: false,
        },
      };
    }

    case types.USER_CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          loading: false,
          success: action.payload.success,
        },
      };
    }

    case types.USER_EDIT_INFO_REQUEST: {
      return {
        ...state,
        editInfo: {
          error: null,
          loading: true,
          success: null,
        },
      };
    }

    case types.USER_EDIT_INFO_FAILURE: {
      return {
        ...state,
        editInfo: {
          error: action.payload.response,
          loading: false,
        },
      };
    }

    case types.USER_EDIT_INFO_SUCCESS: {
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          fullName: action.payload.fullName,
          bio: action.payload.bio ? action.payload.bio : '',
        },
        editInfo: {
          ...state.editInfo,
          loading: false,
          success: action.payload.success,
        },
      };
    }

    case types.USER_AVATAR_REQUEST: {
      return { ...state };
    }

    case types.USER_AVATAR_FAILURE: {
      return {
        ...state,
      };
    }

    case types.USER_AVATAR_SUCCESS: {
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          profilePicture: action.payload.profilePicture,
        },
      };
    }

    case types.ACTIVE_USER_REQUEST: {
      return {
        ...state,
        login: {
          error: null,
          loading: true,
        },
      };
    }

    case types.ACTIVE_USER_SUCCESS: {
      return {
        ...state,
        activeUser: {
          _id: action.payload._id,
          email: action.payload.email,
          username: action.payload.username,
          fullName: action.payload.fullName,
          phoneNumber: action.payload.phoneNumber,
          dateOfBirth: action.payload.dateOfBirth,
          createdAt: action.payload.createdAt,
          profilePicture: action.payload.profilePicture,
          bio: action.payload.bio ? action.payload.bio : '',
          following: action.payload.following,
          followingCount: action.payload.followingCount,
          followers: action.payload.followers,
          followersCount: action.payload.followersCount,
          posts: action.payload.posts,
          postCount: action.payload.postCount,
          savedPosts: [],
        },
        token: action.payload.tokens.slice(-1)[0].token,
        login: {
          ...state.login,
          loading: false,
        },
      };
    }

    case types.ACTIVE_USER_FAILURE: {
      console.log(action);
      return {
        ...state,
        login: {
          loading: false,
          error: action.payload.response,
        },
      };
    }

    default:
      return state;
  }
}
export default authentication;
