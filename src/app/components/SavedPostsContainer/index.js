import React, { useEffect, useState, useRef } from 'react';
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
  const { _id, savedPosts } = useSelector(
    authentication.selectors.getActiveUser
  );
  const error = useSelector(feed.selectors.getFeedError);
  const loading = useSelector(feed.selectors.isFeedLoading);
  const posts = useSelector((state) =>
    feed.selectors.getSavedPosts(state, _id)
  );
  const token = useSelector(authentication.selectors.token);

  // InfiniteScroll
  const [currentPage, setCurrentPage] = useState(1);
  const [element, setElement] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  console.log(posts.length, savedPosts.length);

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
    setHasMore(savedPosts.length > posts.length);
    if (hasMore) {
      dispatch(feed.actions.fetchSavedPosts(token, currentPage));
    }
  }, [feed, currentPage]);

  return (
    <div className="SavedPostsContainer">
      <h4 style={{ fontWeight: '300' }}>Only you can see what you've saved</h4>
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
    </div>
  );
}

export default SavedPostsContainer;
