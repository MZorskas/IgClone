import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';

// Modules
import authentication from '../../../authentication';
import feed from '../../../feed';

// Components
import PostBlock from '../../components/PostBlock';

function Feed() {
  const [currentPage, setCurrentPage] = useState(1);
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const error = useSelector(feed.selectors.getFeedError);
  const loading = useSelector(feed.selectors.isFeedLoading);
  const { _id } = useSelector(authentication.selectors.getActiveUser);
  const posts = useSelector((state) =>
    feed.selectors.getFollowingUsersPosts(state, _id)
  );
  const token = useSelector(authentication.selectors.token);

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
    dispatch(feed.actions.fetchFollowingUsersPosts(token, currentPage));
  }, [feed, currentPage]);

  console.log('FEEED', posts);
  return (
    <div className="Feed">
      {posts &&
        posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <PostBlock
                elementRef={setElement}
                key={post._id}
                placeHolder={post.image}
                postId={post._id}
              ></PostBlock>
            );
          } else {
            return (
              <PostBlock
                key={post._id}
                placeHolder={post.image}
                postId={post._id}
              ></PostBlock>
            );
          }
        })}
    </div>
  );
}

export default Feed;
