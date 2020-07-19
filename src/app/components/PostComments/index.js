import React from 'react';

import './index.scss';
import { useSelector } from 'react-redux';
import feed from '../../../feed';
import Comment from '../../components/Comment';

function PostComments({ postId, block }) {
  const post = useSelector((state) =>
    feed.selectors.isPostFetched(state, postId)
  );
  const postBlock = block ? 'PostCommentsBlock' : 'PostComments';
  // console.log('Post Comments', post);
  return (
    <div className={postBlock}>
      {!!post.description && (
        <Comment
          description
          username={post.user.username}
          placeHolder={post.user.profilePicture}
        >
          {post.description}
        </Comment>
      )}
      {!!post.comments &&
        post.comments.map((comment) => {
          return (
            <Comment
              username={comment.user.username}
              key={comment._id}
              placeHolder={comment.user.profilePicture}
              commentId={comment._id}
              postUserId={comment.post.user}
            >
              {comment.text}
            </Comment>
          );
        })}
    </div>
  );
}

export default PostComments;
