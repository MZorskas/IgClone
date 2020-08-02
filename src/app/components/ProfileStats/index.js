import React, { useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';

//Modules
import users from '../../../users';

//Components
import Button from '../Button';
import Modal from '../Modal';
import UsersContainer from '../UsersContainer';
import Suggestions from '../Suggestions';

function ProfileStats({ username }) {
  const profileUser = useSelector((state) =>
    users.selectors.getProfileUser(state, username)
  );
  //MODALS
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  const openFollowersModal = () => {
    setShowFollowersModal(true);
  };
  const closeModal = () => {
    setShowFollowingModal(false);
    setShowFollowersModal(false);
  };

  const openFollowingModal = () => {
    setShowFollowingModal(true);
  };

  return (
    <div className="ProfileStats">
      <ul>
        <li>
          <span>{profileUser.postCount}</span>{' '}
          {profileUser.postsCount === 1 ? 'post' : 'posts'}
        </li>
        <li
          {...(profileUser.followersCount !== 0 && {
            onClick: openFollowersModal,
          })}
          className="StatsLink"
        >
          <span>{profileUser.followersCount}</span>{' '}
          {profileUser.followersCount ? 'followers' : 'followers'}
        </li>
        <Modal
          title="Followers"
          closeModal={closeModal}
          showModal={showFollowersModal}
        >
          <UsersContainer fetchFollowers closeModal={closeModal} />
          <Button buttonStyle={'btn--white--solid'} onClick={closeModal} modal>
            Cancel
          </Button>
        </Modal>
        <li
          {...(profileUser.followingCount !== 0 && {
            onClick: openFollowingModal,
          })}
          className="StatsLink"
        >
          <span>{profileUser.followingCount}</span> following
        </li>
        <Modal
          title="Following"
          closeModal={closeModal}
          showModal={showFollowingModal}
        >
          <div className="ModalContainer">
            <UsersContainer
              fetchFollowing
              length="long"
              closeModal={closeModal}
            />
            <Suggestions closeModal={closeModal} length="long" />
          </div>
          <Button buttonStyle={'btn--white--solid'} onClick={closeModal} modal>
            Cancel
          </Button>
        </Modal>
      </ul>
    </div>
  );
}

export default ProfileStats;
