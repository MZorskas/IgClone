import React, { useEffect } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostCard from '../PostCard';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import feed from '../../../feed';

function PostsContainer() {
  const { username } = useParams();
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const error = useSelector(feed.selectors.getFeedError);
  const loading = useSelector(feed.selectors.isFeedLoading);
  const posts = useSelector(feed.selectors.getFeedData);

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
