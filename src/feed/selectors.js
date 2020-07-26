export const getFeedError = (state) => state.feed.error;
export const getFeedData = (state) => state.feed.data;
export const isFeedLoading = (state) => state.feed.loading;
export const getPostsCount = (state) => state.feed.postsCount;

export const getPost = (state, postId) =>
  state.feed.data.find((post) => post._id === postId);

export const isPostFetched = (state, postId) =>
  state.feed.data.find((post) => post._id === postId);

export const getComments = (state, postId) => {
  const data = state.feed.data.find((post) => post._id === postId);
  return data ? data.comments : [];
};

export const getUserPosts = (state, username) => {
  const data = state.feed.data.filter(
    (post) => post.user.username === username
  );
  return data ? data : [];
};

export const getSavedPosts = (state, activeUserId) => {
  const data = state.feed.data.filter((post) =>
    post.saves.includes(activeUserId)
  );
  return data ? data : [];
};

export const getFollowingUsersPosts = (state, activeUserId) => {
  const data = state.feed.data.filter((post) =>
    post.user.followers.includes(activeUserId)
  );
  return data ? data : [];
};

export const getExploreData = (state, activeUserId) => {
  console.log('getExploreData', activeUserId);
  const data = state.feed.data.filter(
    (post) =>
      !post.user.followers.includes(activeUserId) &&
      post.user._id != activeUserId
  );

  return data ? data : [];
};

// export const getComment = (state, commentId) => {
//   console.log('xxx', { state, commentId });
//   const post = state.feed.data.filter((post) =>
//     post.comments.find((comment) => comment._id === commentId)
//   );
//   console.log('x', post[0]);
//   const comment = post[0].comments.find((comment) => comment._id === commentId);
//   return comment;
// };
