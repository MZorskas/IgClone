import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';

// Modules
import feed from '../../../feed';
import authentication from '../../../authentication';

//Components
import PostCard from '../PostCard';

function SavedPostsContainer() {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const { _id } = useSelector(authentication.selectors.getActiveUser);
  const error = useSelector(feed.selectors.getFeedError);
  const loading = useSelector(feed.selectors.isFeedLoading);
  const posts = useSelector((state) =>
    feed.selectors.getSavedPosts(state, _id)
  );
  const token = useSelector(authentication.selectors.token);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(feed.actions.fetchSavedPosts(token, page));
  }, [feed, page]);

  return (
    <div className="SavedPostsContainer">
      <h4 style={{ fontWeight: '300' }}>Only you can see what you've saved</h4>
      <div className="PostsContainer">
        {posts &&
          posts.map((post) => {
            return (
              <PostCard
                key={post._id}
                placeHolder={post.image}
                postId={post._id}
              ></PostCard>
            );
          })}
      </div>
    </div>
  );
}

export default SavedPostsContainer;
