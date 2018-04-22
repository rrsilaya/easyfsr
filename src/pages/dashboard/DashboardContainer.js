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
  addFSR,
  getMetaData,
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
    isAddingFSR,
    isGettingMeta,

    isGettingLogs,

    user,
    users,
    searchedUsers,
    selectedUsers,
    announcements,
    notifications,
    log,
    meta,
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
    isAddingFSR,
    isGettingMeta,

    isGettingLogs,

    user,
    users,
    searchedUsers,
    selectedUsers,
    announcements,
    notifications,
    log,
    meta,
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
    addFSR: body => {
      dispatch(addFSR(body));
    },
    getMetaData: query => {
      dispatch(getMetaData(query));
    },
  };
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard,
);
export default DashboardContainer;
