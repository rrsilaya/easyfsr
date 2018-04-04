import { connect } from 'react-redux';
import Profile from './Profile';

import { getUserProfile } from './duck';

const mapStateToProps = state => {
  const { user, isGettingUser } = state.profile;

  return {
    user,
    isGettingUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: id => {
      dispatch(getUserProfile(id));
    },
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
