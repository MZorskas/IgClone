import React, { useState, useEffect } from 'react';
import './index.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Options } from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import feed from '../../../feed';
import Button from '../Button';

function PostNewComment() {
  const { postId } = useParams();

  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const token = useSelector(authentication.selectors.token);
  const [comment, setComment] = useState('');

  const PostComment = (e) => {
    e.preventDefault();
    dispatch(feed.actions.createComment(postId, token, comment));
    console.log('Comment posted:', comment);
    setComment('');
  };

  return (
    <div className="PostNewComment">
      <form className="CommentForm">
        <textarea
          className="CommentInput"
          placeholder="Add a comment..."
          maxLength="300"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <Button
          onClick={PostComment}
          buttonStyle={
            comment ? 'btn--white--solid' : 'btn--white--solid--required'
          }
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default PostNewComment;
