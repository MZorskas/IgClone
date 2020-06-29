import feed from '.';

export const isCreatePostLoading = (state) => state.feed.posts.loading;
export const getCreatePostError = (state) => state.feed.posts.Error;
