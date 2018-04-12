import { connect } from 'react-redux';
import Profile from './Profile';

import {
  getUserProfile,
  getAdminWork,
  getUserExtensionAndCommService,
} from './duck';

const mapStateToProps = state => {
  const { user, isGettingUser, adminWork, service } = state.profile;
  return {
    adminWork,
    user,
    service,
    isGettingUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: id => {
      dispatch(getUserProfile(id));
    },
    getAdminWork: id => {
      dispatch(getAdminWork(id));
    },
    getUserExtensionAndCommService: id => {
      dispatch(getUserExtensionAndCommService(id));
    },
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
