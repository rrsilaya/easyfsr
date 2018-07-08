import { connect } from 'react-redux';
import Profile from './Profile';

import { push } from 'react-router-redux';
import {
  getUserProfile,
  getAdminWork,
  getUserExtensionAndCommService,
  uploadIcon,
  resetPage,
  toggleModal,
  getUserSchedule,
  getUserCreativeWorks,
  getUserLimitedPractices,
  getUserStudyLoads,
  getUserAwards,
  getUserResearches,
} from './duck';

const mapStateToProps = state => {
  const userLoggedIn = state.app.user;

  const {
    user,
    isGettingUser,
    isUploadingIcon,
    adminWork,
    service,
    isLoadingCards,
    isSchedModalOpen,
    isGettingSchedule,
    schedule,
    creativeWork,
    limitedPractice,
    studyLoad,
    award,
    research,
    fsr,
  } = state.profile;

  return {
    adminWork,
    user,
    userLoggedIn,
    service,
    isGettingUser,
    isUploadingIcon,
    isLoadingCards,
    isSchedModalOpen,
    isGettingSchedule,
    schedule,
    creativeWork,
    limitedPractice,
    studyLoad,
    award,
    research,
    fsr,
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
    getUserSchedule: user => {
      dispatch(getUserSchedule(user));
    },
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
    resetPage: () => {
      dispatch(resetPage());
    },
    getUserCreativeWorks: id => {
      dispatch(getUserCreativeWorks(id));
    },
    getUserLimitedPractices: id => {
      dispatch(getUserLimitedPractices(id));
    },
    getUserStudyLoads: id => {
      dispatch(getUserStudyLoads(id));
    },
    getUserAwards: id => {
      dispatch(getUserAwards(id));
    },
    getUserResearches: id => {
      dispatch(getUserResearches(id));
    },
    pushLink: route => {
      dispatch(push(route));
    },
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
