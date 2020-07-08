import React, { useEffect } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';
import { useParams } from 'react-router-dom';
import feed from '../../../feed';

function PostsContainer() {
  const { username } = useParams();
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const error = useSelector(feed.selectors.getFeedError);
  const loading = useSelector(feed.selectors.isFeedLoading);
  const posts = useSelector((state) =>
    feed.selectors.getUserPosts(state, username)
  );

  useEffect(() => {
    dispatch(feed.actions.fetchAllUserPosts(username));
  }, [feed, username]);

  console.log('PostsContainer', posts);
  return (
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
  );
}

export default PostsContainer;
