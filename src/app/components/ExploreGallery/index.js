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
  const posts = useSelector(feed.selectors.getFeedData);
  const token = useSelector(authentication.selectors.token);

  const [currentPage, setCurrentPage] = useState(1);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setCurrentPage(currentPage + 1);
          console.log('visible', first);
        }
      },
      { threshold: 0.1 }
    )
  );

  const [element, setElement] = useState(null);

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
    dispatch(feed.actions.fetchAllUsersPosts(token, currentPage));
    console.log('Current Page', currentPage);
  }, [feed, currentPage]);

  console.log('ExploreGallery', posts);
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
              ></PostCard>
            );
          } else {
            return (
              <PostCard
                key={post._id}
                placeHolder={post.image}
                postId={post._id}
              ></PostCard>
            );
          }
        })}
    </div>
  );
}

export default ExploreGallery;
