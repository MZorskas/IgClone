import React, { useEffect } from 'react';
import './index.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Modules
// import authentication from '../../../authentication';
import users from '../../../users';
import feed from '../../../feed';

// Components
import PostHeader from '../../components/PostHeader';
import PostNavigation from '../../components/PostNavigation';
import PostNewComment from '../../components/PostNewComment';
import PostComments from '../../components/PostComments';
import PostFileContainer from '../../components/PostFileContainer';

function Post() {
  const { postId } = useParams();
  const dispatch = useDispatch();

  // Selectors
  // const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  // const token = useSelector(authentication.selectors.token);
  const error = useSelector(users.selectors.getUsersError);
  const post = useSelector((state) =>
    feed.selectors.isPostFetched(state, postId)
  );

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     dispatch(authentication.actions.loginUserWithStorage(token));
  //   }
  // }, [isAuthorized, authentication, token]);

  useEffect(() => {
    dispatch(feed.actions.fetchSinglePost(postId));
  }, [feed, postId]);

  return (
    <React.Fragment>
      {post && (
        <div className="Post">
          <div className="PostContainer">
            <PostFileContainer postId={postId} placeholder={post.image} />
            <div className="PostInfoContainer">
              <PostHeader postId={postId} />
              <PostComments postId={postId} />
              <PostNavigation postId={postId} />
              <PostNewComment postId={postId} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Post;
