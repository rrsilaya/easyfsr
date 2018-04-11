import { connect } from 'react-redux';
import Profile from './Profile';

import { getUserProfile, uploadIcon } from './duck';

const mapStateToProps = state => {
  const { user, isGettingUser, isUploadingIcon } = state.profile;

  return {
    user,
    isGettingUser,
    isUploadingIcon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: id => {
      dispatch(getUserProfile(id));
    },
    uploadIcon: (user, form) => {
      dispatch(uploadIcon(user, form));
    },
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
