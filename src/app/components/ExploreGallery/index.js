import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';

// Modules
import feed from '../../../feed';
import authentication from '../../../authentication';

//Components
import PostCard from '../PostCard';

function ExploreGallery() {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const error = useSelector(feed.selectors.getFeedError);
  const loading = useSelector(feed.selectors.isFeedLoading);
  const { _id } = useSelector(authentication.selectors.getActiveUser);
  const posts = useSelector((state) =>
    feed.selectors.getExploreData(state, _id)
  );
  const token = useSelector(authentication.selectors.token);
  const postsCount = useSelector(feed.selectors.getPostsCount);

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

  // Vyksta viena kart
  useEffect(() => {
    dispatch(feed.actions.fetchAllExplorePosts(token, currentPage));
  }, []);

  useEffect(() => {
    // console.log('Before useEffect', hasMore, postsCount);

    if (postsCount > posts.length) {
      console.log('Vykdau pakartotini partraukima');
      console.log('Vykdau pakartotini partraukima');
      console.log('Vykdau pakartotini partraukima');
      console.log('Vykdau pakartotini partraukima');
      console.log('Vykdau pakartotini partraukima');
      console.log('Vykdau pakartotini partraukima');
      dispatch(feed.actions.fetchAllExplorePosts(token, currentPage));
    }
    // console.log('After useEffect', hasMore, postsCount);

    // console.log('Current Page', postsCount, posts.length);
  }, [feed, currentPage]);

  // console.log('ExploreGallery', posts);
  console.log('ExploreGallery ELEMENT', element);
  return (
    <div className="ExploreGallery">
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

export default ExploreGallery;
