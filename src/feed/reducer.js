import * as types from './types';

const DEFAULT_FEED_STATE = {
  data: [],
  loading: false,
  error: false,
};

const createComment = (data, action) => {
  const postIndex = data.findIndex(
    (post) => post._id === action.payload.data.post
  );
  console.log('Push comment', postIndex);
  if (postIndex === -1) {
    return data;
  }
  const newData = [...data];
  newData[postIndex].comments = [
    ...newData[postIndex].comments,
    action.payload.data,
  ];
  console.log('Push comment newData', newData, action.payload.data);
  // .find((post) => post._id === action.payload.data.post)
  // .comments.concat(action.payload.data);
  return newData;
};

// const deleteComment = (data, action) => {
//   const post = data.filter(post => post.comments.some((comment=> comment._id === action.payload.data.commentId)))
//   console.log('deleteComment, POST:', post);
//   if (postIndex === -1) {
//     return data;
//   }

//   const newData = [...data];

//   newData[postIndex].comments = [
//     ...newData[postIndex].comments,
//     action.payload.data,
//   ];
//   console.log('deleteComment, POST:', newData, action.payload.data);
//   // .find((post) => post._id === action.payload.data.post)
//   // .comments.concat(action.payload.data);
//   return newData;
// };

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
      return {
        ...state,
        loading: false,
        //   data: state.data.some((post) => post._id === action.payload.data.post)
        //     ? pushComment(state, action)
        //     : state.data,
        data: createComment(state.data, action),
      };
      // return state.data.some((post) => post._id === action.payload.data.post)
      //   ? pushComment(state, action)
      //   : state;
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
      // return state.data.some((post) => post._id === action.payload.data.post)
      //   ? pushComment(state, action)
      //   : state;
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
      // return state.data.some((post) => post._id === action.payload.data.post)
      //   ? pushComment(state, action)
      //   : state;
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
        data: action.payload,
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

      // state.data[state.data.findIndex(post => post._id === action.payload.id)]
      return {
        ...state,
        loading: false,
        data: state.data.some(({ _id }) => _id === action.payload._id)
          ? state.data.map((post) =>
              post._id === action.payload._id ? action.payload : post
            )
          : [...state.data, action.payload],
        // data: state.data.map((post) =>
        //   post._id === action.payload._id ? action.payload : post
        // ),
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

    default:
      return state;
  }
}
export default feed;
