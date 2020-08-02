import users from '.';

export const isUsersLoading = (state) => state.users.loading;
export const getUsersError = (state) => state.users.error;

export const isToggleFollowUserLoading = (state) =>
  state.users.toggleFollowUser.loading;
export const getToggleFollowUserError = (state) =>
  state.users.toggleFollowUser.error;

export const isUserFetched = ({ users }, username) =>
  users.data.find((user) => user.username === username);

export const getProfileUser = (state, username) => {
  const profileUser = state.users.data.find(
    (user) => user.username === username
  );
  return profileUser ? profileUser : { followers: [], following: [] };
};

export const getFollowers = (state, followers) =>
  state.users.data.filter((user) => followers.includes(user._id));

export const getFollowingUsers = (state, following) =>
  state.users.data.filter((user) => following.includes(user._id));

export const getUserById = (state, userId) =>
  state.users.data.find((user) => user._id === userId);

export const getNotFollowedUsers = (state, activeUser) =>
  // state.users.data.filter((user) => !user.followers.includes(activeUser._id));
  state.users.data.filter((user) => !activeUser.following.includes(user._id));

export const getAllFollowingUsers = (state, activeUser) =>
  // state.users.data.filter((user) => !user.followers.includes(activeUser._id));
  state.users.data.filter((user) => activeUser.following.includes(user._id));

export const getSearchData = (state) => state.users.search.data;
export const getSearchError = (state) => state.users.search.error;
export const isSearchLoading = (state) => state.users.search.loading;
