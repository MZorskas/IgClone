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
        data: [...state.data, action.payload.post],
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

    case types.CREATE_COMMENT_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.CREATE_COMMENT_SUCCESS: {
      const postIndex = state.data.findIndex(
        (post) => post._id === action.payload.data.post
      );
      console.log('CREATE_COMMENT_SUCCESS', postIndex);
      return {
        ...state,
        loading: false,
        data: [
          ...state.data.slice(0, postIndex),
          {
            ...state.data[postIndex],
            comments: [...state.data[postIndex].comments, action.payload.data],
          },
          ...state.data.slice(postIndex + 1),
        ],
      };
    }

    case types.CREATE_COMMENT_FAILURE: {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.DELETE_COMMENT_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: state.data.filter((post) =>
          post.comments.some(
            (comment) => comment._id === action.payload.commentId
          )
        )
          ? state.data.map((post) => {
              return {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== action.payload.commentId
                ),
              };
            })
          : state.data,
      };
    }

    case types.DELETE_COMMENT_FAILURE: {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.DELETE_POST_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.DELETE_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: state.data.some(({ _id }) => _id === action.payload._id)
          ? state.data.filter((post) => post._id !== action.payload.postId)
          : state.data,
      };
    }

    case types.DELETE_POST_FAILURE: {
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

    case types.USERS_POSTS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.USERS_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    }

    case types.USERS_POSTS_FAILURE: {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.SINGLE_POST_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.SINGLE_POST_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        data: state.data.some(({ _id }) => _id === action.payload._id)
          ? state.data.map((post) =>
              post._id === action.payload._id ? action.payload : post
            )
          : [...state.data, action.payload],
      };
    }

    case types.SINGLE_POST_FAILURE: {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.TOGGLE_SAVE_POST_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.TOGGLE_SAVE_POST_SUCCESS: {
      const postIndex = state.data.findIndex(
        (post) => post._id === action.payload.postId
      );
      const post = state.data.find(
        (post) => post._id === action.payload.postId
      );
      return {
        ...state,
        loading: false,
        data: post.saves.includes(action.payload.userId)
          ? [
              ...state.data.slice(0, postIndex),
              {
                ...state.data[postIndex],
                saves: state.data[postIndex].saves.filter(
                  (user) => user !== action.payload.userId
                ),
              },
              ...state.data.slice(postIndex + 1),
            ]
          : [
              ...state.data.slice(0, postIndex),
              {
                ...state.data[postIndex],
                saves: [...state.data[postIndex].saves, action.payload.userId],
              },
              ...state.data.slice(postIndex + 1),
            ],
      };
    }

    case types.TOGGLE_SAVE_POST_FAILURE: {
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
