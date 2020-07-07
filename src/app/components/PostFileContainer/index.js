import React from 'react';
import { useSelector } from 'react-redux';
import './index.scss';

//Modules
import feed from '../../../feed';

function PostFileContainer({ postId, block }) {
  const { image } = useSelector((state) =>
    feed.selectors.getPost(state, postId)
  );

  const postBlock = block ? 'PostImageBlock' : 'PostImage';
  return (
    <div className="PostFileContainer">
      <img
        className={postBlock}
        src={image ? image : `${postId} image`}
        alt="Post Image"
      />
    </div>
  );
}

export default PostFileContainer;
