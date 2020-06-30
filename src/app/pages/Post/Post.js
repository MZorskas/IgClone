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

function Post() {
  const { username } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);
  const error = useSelector(users.selectors.getSingleUserError);
  const [profileUser, setprofileUser] = useState({});

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(authentication.actions.loginUserWithStorage(token));
    }
  }, [isAuthorized, authentication, token]);

  // console.log('Profile page username', username);
  // console.log('Profile page activeUser', activeUser);
  // console.log('Profile page profileUser', profileUser);
  // console.log('Profile page user', user);
  // console.log('Profile page profileUser', profileUser);

  return (
    <React.Fragment>
      <div className="Post">
        <div className="PostContainer">
          <div className="PostFileContainer">
            <img
              src="http://localhost:3001/uploads\159352284868111resized.jpg"
              alt="Post Image"
            />
          </div>
          <div className="PostInfoContainer">
            <PostHeader>
              <span>Username</span>
            </PostHeader>
            <div className="PostComments">
              <div className="CommentContainer">
                <div className="CommentAvatar">
                  <Link>
                    <img
                      className="AuthorAvatar"
                      id="ProfileAvatar"
                      src="https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png"
                    />
                  </Link>
                </div>
                <div className="Comment">
                  <span>Username</span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing
                    elitLorem ipsum dolor sitLorem ipsum dolor sit, amet
                    consectetur adipisicing elit
                  </p>
                </div>
              </div>
              <div className="CommentContainer">
                <div className="CommentAvatar">
                  <Link>
                    <img
                      className="AuthorAvatar"
                      id="ProfileAvatar"
                      src="https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png"
                    />
                  </Link>
                </div>
                <div className="Comment">
                  <span>Username</span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing
                    elitLorem ipsum dolor sitLorem ipsum dolor sit, amet
                    consectetur adipisicing elit
                  </p>
                </div>
              </div>
              <div className="CommentContainer">
                <div className="CommentAvatar">
                  <Link>
                    <img
                      className="AuthorAvatar"
                      id="ProfileAvatar"
                      src="https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png"
                    />
                  </Link>
                </div>
                <div className="Comment">
                  <span>Username</span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing
                    elitLorem ipsum dolor sitLorem ipsum dolor sit, amet
                    consectetur adipisicing elit
                  </p>
                </div>
              </div>
            </div>
            <PostNavigation />
            <div className="PostNewComment"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Post;
