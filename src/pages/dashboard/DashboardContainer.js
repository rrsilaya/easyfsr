import { connect } from 'react-redux';
import Dashboard from './Dashboard';

import {
  toggleModal,
  searchUser,
  addNotification,
  addAnnouncement,
  getAnnouncements,
  getNotifications,
  getLog,
  addMetaData,
} from './duck';

const mapStateToProps = state => {
  const {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isSettingsModalOpen,

    isAddingNotification,
    isAddingAnnouncement,

    isGettingLogs,

    user,
    searchedUsers,
    announcements,
    notifications,
    log,
  } = state.dashboard;

  return {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isSettingsModalOpen,

    isAddingNotification,
    isAddingAnnouncement,

    isGettingLogs,

    user,
    searchedUsers,
    announcements,
    notifications,
    log,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
    searchUser: query => {
      dispatch(searchUser(query));
    },
    addNotification: values => {
      dispatch(addNotification(values));
    },
    addAnnouncement: values => {
      dispatch(addAnnouncement(values));
    },
    getAnnouncements: () => {
      dispatch(getAnnouncements());
    },
    getNotifications: () => {
      dispatch(getNotifications());
    },
    getLog: () => {
      dispatch(getLog());
    },
    addMetaData: values => {
      dispatch(addMetaData(values));
    },
  };
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard,
);
export default DashboardContainer;
