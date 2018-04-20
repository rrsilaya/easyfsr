import { connect } from 'react-redux';
import Dashboard from './Dashboard';

import {
  toggleModal,
  searchUser,
  getUsers,
  addNotification,
  addAnnouncement,
  getAnnouncements,
  getNotifications,
  changeSelectedUsers,
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
    isGettingAnnouncements,
    isGettingNotifications,

    isGettingLogs,

    user,
    users,
    searchedUsers,
    selectedUsers,
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
    isGettingAnnouncements,
    isGettingNotifications,

    isGettingLogs,

    user,
    users,
    searchedUsers,
    selectedUsers,
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
    getUsers: query => {
      dispatch(getUsers(query));
    },
    changeSelectedUsers: user => {
      dispatch(changeSelectedUsers(user));
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
