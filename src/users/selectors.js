import users from '.';

export const isSingleUserLoading = (state) => state.users.loading;
export const getSingleUserError = (state) => state.users.error;

export const isUserFetched = ({ users }, username) =>
  users.data.find((user) => user.username === username);
