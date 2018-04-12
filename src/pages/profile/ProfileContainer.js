import { connect } from 'react-redux';
import Profile from './Profile';

import { toggleEditModal, getUsers, getUserProfile, editUser } from './duck';

const mapStateToProps = state => {
  const { isEditModalOpen, isGettingUser, isEditingUser, user } = state.profile;

  return {
    isEditModalOpen,
    isGettingUser,
    isEditingUser,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEditModal: () => {
      dispatch(toggleEditModal());
    },
    editUser: (user, values) => {
      dispatch(editUser(user, values));
    },
    getUserProfile: id => {
      dispatch(getUserProfile(id));
    },
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
