import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';
import { useParams } from 'react-router-dom';
import feed from '../../../feed';
import users from '../../../users';

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

  const { postCount } = useSelector((state) =>
    users.selectors.getProfileUser(state, username)
  );

  // InfiniteScroll
  const [currentPage, setCurrentPage] = useState(1);
  const [element, setElement] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setCurrentPage((previousPage) => previousPage + 1);
          console.log('visible', first);
        }
      },
      { threshold: 0.1 }
    )
  );

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  useEffect(() => {
    dispatch(feed.actions.fetchAllUserPosts(username, currentPage));
  }, []);

  useEffect(() => {
    if (postCount > posts.length) {
      dispatch(feed.actions.fetchAllUserPosts(username, currentPage));
    }
  }, [feed, currentPage]);

  return (
    <div className="PostsContainer">
      {posts &&
        posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <PostCard
                elementRef={setElement}
                key={post._id}
                placeHolder={post.image}
                postId={post._id}
                commentsCount={post.commentsCount}
                likeCount={post.likeCount}
              ></PostCard>
            );
          } else {
            return (
              <PostCard
                key={post._id}
                placeHolder={post.image}
                postId={post._id}
                commentsCount={post.commentsCount}
                likeCount={post.likeCount}
              ></PostCard>
            );
          }
        })}
    </div>
  );
}

export default PostsContainer;
