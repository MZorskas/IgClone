import * as types from './types';

const DEFAULT_FEED_STATE = {
  data: [],
  loading: false,
  error: false,
  postsCount: null,
};

const addWithoutDuplicates = (data, action) => {
  console.log('addWithoutDuplicates data:', data, action);
  const newData = action;
  // console.log('addWithoutDuplicates newData:', newData);
  const ids = new Set(newData.map((e) => e._id));
  // console.log('addWithoutDuplicates ids', ids);
  const newState = data.filter((a) => !ids.has(a._id)).concat(newData);
  // console.log('addWithoutDuplicates', newState);
  return newState;
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
        data: [action.payload.post, ...state.data],
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

    case types.SAVED_POSTS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.SAVED_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: addWithoutDuplicates(state.data, action.payload),
      };
    }

    case types.SAVED_POSTS_FAILURE: {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    // COMMENTS

    case types.CREATE_COMMENT_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.CREATE_COMMENT_SUCCESS: {
      const postIndex = state.data.findIndex(
        (post) => post._id === action.payload.comment.post._id
      );
      return {
        ...state,
        loading: false,
        data: [
          ...state.data.slice(0, postIndex),
          {
            ...state.data[postIndex],
            comments: [
              ...state.data[postIndex].comments,
              action.payload.comment,
            ],
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
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.TOGGLE_LIKE_COMMENT_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.TOGGLE_LIKE_COMMENT_SUCCESS: {
      const postIndex = state.data.findIndex(
        (post) => post._id === action.payload.postId
      );

      const commentIndex = state.data[postIndex].comments.findIndex(
        (comment) => comment._id === action.payload.commentId
      );

      return {
        ...state,
        loading: false,
        data: state.data[postIndex].comments[commentIndex].likes.includes(
          action.payload.userId
        )
          ? [
              ...state.data.slice(0, postIndex),
              {
                ...state.data[postIndex],
                comments: [
                  ...state.data[postIndex].comments.slice(0, commentIndex),
                  {
                    ...state.data[postIndex].comments[commentIndex],
                    likes: state.data[postIndex].comments[
                      commentIndex
                    ].likes.filter((user) => user !== action.payload.userId),
                    likesCount:
                      state.data[postIndex].comments[commentIndex].likesCount -
                      1,
                  },
                  ...state.data[postIndex].comments.slice(commentIndex + 1),
                ],
              },
              ...state.data.slice(postIndex + 1),
            ]
          : [
              ...state.data.slice(0, postIndex),
              {
                ...state.data[postIndex],
                comments: [
                  ...state.data[postIndex].comments.slice(0, commentIndex),
                  {
                    ...state.data[postIndex].comments[commentIndex],
                    likes: [
                      ...state.data[postIndex].comments[commentIndex].likes,
                      action.payload.userId,
                    ],
                    likesCount:
                      state.data[postIndex].comments[commentIndex].likesCount +
                      1,
                  },
                  ...state.data[postIndex].comments.slice(commentIndex + 1),
                ],
              },
              ...state.data.slice(postIndex + 1),
            ],
      };
    }

    case types.TOGGLE_LIKE_COMMENT_FAILURE: {
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
        data: state.data.some((post) => post._id === action.payload.post)
          ? state.data.filter((post) => post._id !== action.payload.post)
          : state.data,
      };
    }

    case types.DELETE_POST_FAILURE: {
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
        data: addWithoutDuplicates(state.data, action.payload),
      };
    }

    case types.SINGLE_USER_POSTS_FAILURE: {
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
        data: addWithoutDuplicates(state.data, action.payload.data),
        postsCount: action.payload.count,
      };
    }

    case types.USERS_POSTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    //
    case types.FOLLOWING_USERS_POSTS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.FOLLOWING_USERS_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: addWithoutDuplicates(state.data, action.payload),
      };
    }

    case types.FOLLOWING_USERS_POSTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }
    //

    case types.SINGLE_POST_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.SINGLE_POST_SUCCESS: {
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
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.TOGGLE_LIKE_POST_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.TOGGLE_LIKE_POST_SUCCESS: {
      const postIndex = state.data.findIndex(
        (post) => post._id === action.payload.postId
      );
      const post = state.data.find(
        (post) => post._id === action.payload.postId
      );

      return {
        ...state,
        loading: false,
        data: post.likes.includes(action.payload.userId)
          ? [
              ...state.data.slice(0, postIndex),
              {
                ...state.data[postIndex],
                likes: state.data[postIndex].likes.filter(
                  (user) => user !== action.payload.userId
                ),
                likeCount: state.data[postIndex].likeCount - 1,
              },
              ...state.data.slice(postIndex + 1),
            ]
          : [
              ...state.data.slice(0, postIndex),
              {
                ...state.data[postIndex],
                likes: [...state.data[postIndex].likes, action.payload.userId],
                likeCount: state.data[postIndex].likeCount + 1,
              },
              ...state.data.slice(postIndex + 1),
            ],
      };
    }

    case types.TOGGLE_LIKE_POST_FAILURE: {
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
