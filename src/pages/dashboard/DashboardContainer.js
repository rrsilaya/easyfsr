import { connect } from 'react-redux';
import Dashboard from './Dashboard';

import {
  toggleModal,
  toggleConfirmAnnouncementModal,
  toggleConfirmNotificationModal,
  getAnnouncements,
  getNotifications,
  createAnnouncement,
  createNotification,
  deleteDashboard,
} from './duck';

const mapStateToProps = state => {
  const {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isConfirmAnnouncementModalOpen,
    isConfirmNotificationModalOpen,

    announcements,
    notifications,
  } = state.dashboard;

  return {
    isSendNotificationModalOpen,
    isCreateFSRModalOpen,
    isCreateAnnouncementModalOpen,
    isConfirmAnnouncementModalOpen,
    isConfirmNotificationModalOpen,

    announcements,
    notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
    toggleConfirmAnnouncementModal: () => {
      dispatch(toggleConfirmAnnouncementModal());
    },
    toggleConfirmNotificationModal: () => {
      dispatch(toggleConfirmNotificationModal());
    },
    getAnnouncements: () => {
      dispatch(getAnnouncements());
    },
    getNotifications: () => {
      dispatch(getNotifications());
    },
    createAnnouncement: () => {
      dispatch(createAnnouncement());
    },
    createNotification: () => {
      dispatch(createNotification());
    },
  };
};

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard,
);
export default DashboardContainer;
