import { connect } from 'react-redux';
import Profile from './Profile';

import {
  getUserProfile,
  getAdminWork,
  getUserExtensionAndCommService,
  uploadIcon,
  resetPage,
  toggleModal,
} from './duck';

const mapStateToProps = state => {
  const {
    user,
    isGettingUser,
    isUploadingIcon,
    adminWork,
    service,
    isLoadingCards,
    isSchedModalOpen,
  } = state.profile;

  return {
    adminWork,
    user,
    service,
    isGettingUser,
    isUploadingIcon,
    isLoadingCards,
    isSchedModalOpen,
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
    uploadIcon: (user, form) => {
      dispatch(uploadIcon(user, form));
    },
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
    resetPage: () => {
      dispatch(resetPage());
    },
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
