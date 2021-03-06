import * as types from './types';

const DEFAULT_USERS_STATE = {
  data: [],
  loading: false,
  error: false,
  search: {
    data: [],
    error: null,
    loading: false,
  },
  toggleFollowUser: {
    error: null,
    loading: false,
  },
};

const addWithoutDuplicates = (data, action) => {
  // console.log('addWithoutDuplicates data:', data);
  const newData = action.payload;
  // console.log('addWithoutDuplicates newData:', newData);
  const ids = new Set(newData.map((e) => e._id));
  // console.log('addWithoutDuplicates ids', ids);
  const newState = data.filter((a) => !ids.has(a._id)).concat(newData);
  // console.log('addWithoutDuplicates', newState);
  return newState;
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
        data: state.data.some(
          ({ username }) => username === action.payload.username
        )
          ? state.data.map((user) =>
              user.username === action.payload.username ? action.payload : user
            )
          : [...state.data, action.payload],
      };
    }

    case types.SINGLE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.TOGGLE_FOLLOW_USER_REQUEST: {
      return {
        ...state,
        toggleFollowUser: {
          error: null,
          loading: true,
        },
      };
    }

    // case types.TOGGLE_FOLLOW_USER_SUCCESS: {
    //   const userIndex = state.data.findIndex(
    //     (user) => user._id === action.payload.targetUserId
    //   );
    //   const user = state.data.find(
    //     (user) => user._id === action.payload.targetUserId
    //   );
    //   return {
    //     ...state,
    //     toggleFollowUser: {
    //       ...state.toggleFollowUser,
    //       loading: false,
    //     },
    //     data: user.followers.includes(action.payload.reqUserId)
    //       ? [
    //           ...state.data.slice(0, userIndex),
    //           {
    //             ...state.data[userIndex],
    //             followers: state.data[userIndex].followers.filter(
    //               (user) => user !== action.payload.reqUserId
    //             ),
    //             followersCount: state.data[userIndex].followersCount - 1,
    //           },
    //           ...state.data.slice(userIndex + 1),
    //         ]
    //       : [
    //           ...state.data.slice(0, userIndex),
    //           {
    //             ...state.data[userIndex],
    //             followers: [
    //               ...state.data[userIndex].followers,
    //               action.payload.reqUserId,
    //             ],
    //             followersCount: state.data[userIndex].followersCount + 1,
    //           },
    //           ...state.data.slice(userIndex + 1),
    //         ],
    //   };
    // }

    case types.TOGGLE_FOLLOW_USER_SUCCESS: {
      const userIndex = state.data.findIndex(
        (user) => user._id === action.payload.targetUserId
      );
      const user = state.data.find(
        (user) => user._id === action.payload.targetUserId
      );
      return {
        ...state,
        toggleFollowUser: {
          ...state.toggleFollowUser,
          loading: false,
        },
        data: user.followers.includes(action.payload.reqUserId)
          ? [
              ...state.data.slice(0, userIndex),
              {
                ...state.data[userIndex],
                followers: state.data[userIndex].followers.filter(
                  (user) => user !== action.payload.reqUserId
                ),
                followersCount: state.data[userIndex].followersCount - 1,
              },
              ...state.data.slice(userIndex + 1),
            ]
          : [
              ...state.data.slice(0, userIndex),
              {
                ...state.data[userIndex],
                followers: [
                  ...state.data[userIndex].followers,
                  action.payload.reqUserId,
                ],
                followersCount: state.data[userIndex].followersCount + 1,
              },
              ...state.data.slice(userIndex + 1),
            ],
      };
    }

    case types.TOGGLE_FOLLOW_USER_FAILURE: {
      return {
        ...state,
        toggleFollowUser: {
          loading: false,
          error: action.payload.response,
        },
      };
    }

    case types.FOLLOWERS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.FOLLOWERS_SUCCESS: {
      // const newData = action.payload;
      // const ids = new Set(state.data.map((e) => e._id));
      // const newState = newData.filter((a) => !ids.has(a.id)).concat(newData);
      return {
        ...state,
        loading: false,
        data: addWithoutDuplicates(state.data, action),
      };
    }

    case types.FOLLOWERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.FOLLOWING_USERS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.FOLLOWING_USERS_SUCCESS: {
      // const newData = action.payload;
      // const ids = new Set(state.data.map((e) => e._id));
      // const newState = newData.filter((a) => !ids.has(a.id)).concat(newData);
      return {
        ...state,
        loading: false,
        // data: state.data.concat(action.payload),
        data: addWithoutDuplicates(state.data, action),
      };
    }

    case types.FOLLOWING_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    case types.NOT_FOLLOWED_USERS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.NOT_FOLLOWED_USERS_SUCCESS: {
      // const newData = action.payload;
      // const ids = new Set(state.data.map((e) => e._id));
      // const newState = newData.filter((a) => !ids.has(a.id)).concat(newData);
      return {
        ...state,
        loading: false,
        data: addWithoutDuplicates(state.data, action),
      };
    }

    case types.NOT_FOLLOWED_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.response,
      };
    }

    ////////////

    case types.SEARCH_USER_REQUEST: {
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
          error: null,
        },
      };
    }

    case types.SEARCH_USER_SUCCESS: {
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          data: action.payload,
        },
      };
    }

    case types.SEARCH_USER_FAILURE: {
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: action.payload,
        },
      };
    }

    case types.INC_PROFILE_USER_POST_COUNT: {
      console.log('x', action);
      const userIndex = state.data.findIndex(
        (user) => user.username === action.username
      );
      console.log('x', userIndex);
      return {
        ...state,
        data: [
          ...state.data.slice(0, userIndex),
          {
            ...state.data[userIndex],

            postCount: state.data[userIndex].postCount + 1,
          },
          ...state.data.slice(userIndex + 1),
        ],
      };
    }

    case types.DEC_PROFILE_USER_POST_COUNT: {
      const userIndex = state.data.findIndex(
        (user) => user.username === action.username
      );
      return {
        ...state,
        data: [
          ...state.data.slice(0, userIndex),
          {
            ...state.data[userIndex],

            postCount: state.data[userIndex].postCount - 1,
          },
          ...state.data.slice(userIndex + 1),
        ],
      };
    }

    default:
      return state;
  }
}
export default users;
