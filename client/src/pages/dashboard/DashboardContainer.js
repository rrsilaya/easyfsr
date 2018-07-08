import { connect } from 'react-redux';
import Dashboard from './Dashboard';

import {
  toggleModal,
  searchUser,
  getUsers,
  addNotification,
  deleteNotification,
  deleteAnnouncement,
  addAnnouncement,
  getAnnouncements,
  getNotifications,
  changeSelectedUsers,
  getLog,
  addMetaData,
  resetPage,
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
    isDeletingAnnouncement,
    isGettingAnnouncements,
    isGettingNotifications,
    isAddingFSR,
    isGettingMeta,
    isDeletingNotification,

    isGettingLogs,

    user,
    users,
    searchedUsers,
    selectedUsers,
    announcements,
    notifications,
    log,
    meta,
    pagination,
  } = state.dashboard;

  return {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isSettingsModalOpen,

    isAddingNotification,
    isAddingAnnouncement,
    isDeletingAnnouncement,
    isGettingAnnouncements,
    isGettingNotifications,
    isAddingFSR,
    isGettingMeta,
    isDeletingNotification,

    isGettingLogs,

    user,
    users,
    searchedUsers,
    selectedUsers,
    announcements,
    notifications,
    log,
    meta,
    pagination,
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
    deleteNotification: id => {
      dispatch(deleteNotification(id));
    },
    addAnnouncement: values => {
      dispatch(addAnnouncement(values));
    },
    deleteAnnouncement: id => {
      dispatch(deleteAnnouncement(id));
    },
    getAnnouncements: () => {
      dispatch(getAnnouncements());
    },
    getNotifications: query => {
      dispatch(getNotifications(query));
    },
    getUsers: query => {
      dispatch(getUsers(query));
    },
    changeSelectedUsers: user => {
      dispatch(changeSelectedUsers(user));
    },
    getLog: query => {
      dispatch(getLog(query));
    },
    addMetaData: values => {
      dispatch(addMetaData(values));
    },
    resetPage: () => {
      dispatch(resetPage());
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
