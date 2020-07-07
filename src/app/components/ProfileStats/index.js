import React, { useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';

//Modules
import users from '../../../users';

//Components
import Button from '../Button';
import Modal from '../Modal';
import UsersContainer from '../UsersContainer';

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
  const closeFollowersModal = () => {
    setShowFollowersModal(false);
  };
  const openFollowingModal = () => {
    setShowFollowingModal(true);
  };
  const closeFollowingModal = () => {
    setShowFollowingModal(false);
  };

  return (
    <div className="ProfileStats">
      <ul>
        <li>
          <span>{profileUser.postCount}</span>{' '}
          {profileUser.postsCount === 1 ? 'post' : 'posts'}
        </li>
        <li onClick={openFollowersModal} className="StatsLink">
          <span>{profileUser.followersCount}</span>{' '}
          {profileUser.followersCount ? 'followers' : 'followers'}
        </li>
        <Modal
          title="Followers"
          closeModal={closeFollowersModal}
          showModal={showFollowersModal}
        >
          <UsersContainer fetchFollowers />
          <Button
            buttonStyle={'btn--white--solid'}
            onClick={closeFollowersModal}
            modal
          >
            Cancel
          </Button>
        </Modal>
        <li onClick={openFollowingModal} className="StatsLink">
          <span>{profileUser.followingCount}</span> following
        </li>
        <Modal
          title="Followers"
          closeModal={closeFollowingModal}
          showModal={showFollowingModal}
        >
          <UsersContainer fetchFollowing />
          <Button
            buttonStyle={'btn--white--solid'}
            onClick={closeFollowingModal}
            modal
          >
            Cancel
          </Button>
        </Modal>
      </ul>
    </div>
  );
}

export default ProfileStats;
