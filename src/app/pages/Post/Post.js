import React, { useEffect, useState } from 'react';
import './index.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import users from '../../../users';
import feed from '../../../feed';
import NotFound from '../../pages/NotFound/NotFound';
import PostHeader from '../../components/PostHeader';
import PostNavigation from '../../components/PostNavigation';
import Comment from '../../components/Comment';
import Button from '../../components/Button';
import PostNewComment from '../../components/PostNewComment';

function Post() {
  const { postId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);
  const error = useSelector(users.selectors.getSingleUserError);
  const post = useSelector((state) =>
    feed.selectors.isPostFetched(state, postId)
  );

  const postX = useSelector((state) => feed.selectors.getPost(state, postId));

  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(authentication.actions.loginUserWithStorage(token));
    }
  }, [isAuthorized, authentication, token]);

  useEffect(() => {
    dispatch(feed.actions.fetchSinglePost(postId));
  }, [feed, postId]);

  return (
    <React.Fragment>
      {post && (
        <div className="Post">
          <div className="PostContainer">
            <div className="PostFileContainer">
              <img src={post.image ? post.image : ''} alt="Post Image" />
            </div>
            <div className="PostInfoContainer">
              <PostHeader placeHolder={post.user.profilePicture}>
                <span>{post.user.username}</span>
              </PostHeader>
              <div className="PostComments">
                {!!post.comments &&
                  post.comments.map((comment) => {
                    return (
                      <Comment
                        username={comment.user.username}
                        key={comment._id}
                        placeHolder={comment.user.profilePicture}
                        commentId={comment._id}
                      >
                        {comment.text}
                      </Comment>
                    );
                  })}
              </div>
              <PostNavigation />
              <PostNewComment />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Post;
