import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import {
  timeSincePostCreation,
  timeSinceCommentCreation,
} from '../../utils/timeSince';

function Date({ creationDate, postId, comment }) {
  console.log(comment, creationDate, postId);
  return (
    <React.Fragment>
      {comment ? (
        <div className="CommentDate">
          <a className="Date">
            <span>{timeSinceCommentCreation(creationDate)}</span>
          </a>
        </div>
      ) : (
        <div className="PostDate">
          <Link to={`/p/${postId}`} className="Date">
            <span>{timeSincePostCreation(creationDate)}</span>
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}

export default Date;
