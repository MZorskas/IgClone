import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import {
  timeSincePostCreation,
  timeSinceCommentCreation,
} from '../../utils/timeSince';

function Date({ creationDate, postId, comment }) {
  return (
    <React.Fragment>
      {comment ? (
        <div className="Date">
          <a className="CommentDate">
            <span>{timeSinceCommentCreation(creationDate)}</span>
          </a>
        </div>
      ) : (
        <div className="Date">
          <Link to={`/p/${postId}`} className="PostDate">
            <span>{timeSincePostCreation(creationDate)}</span>
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}

export default Date;
