import feed from '.';

// export const isCreatePostLoading = (state) => state.feed.posts.loading;
// export const getCreatePostError = (state) => state.feed.posts.Error;

export const getFeedError = (state) => state.feed.error;
export const getFeedData = (state) => state.feed.data;
export const isFeedLoading = (state) => state.feed.loading;

export const isPostFetched = (state, postId) =>
  state.feed.data.find((post) => post._id === postId);

export const getComments = (state, postId) => {
  const data = state.feed.data.find((post) => post._id === postId);
  return data ? data.comments : [];
};
