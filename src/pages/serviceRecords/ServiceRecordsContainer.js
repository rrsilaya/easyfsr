import { connect } from 'react-redux';
import ServiceRecords from './ServiceRecords';

import { push } from 'react-router-redux';
import { getFSRs, getAnnouncements, getNotifications } from './duck';

const mapStateToProps = state => {
  const {
    fsr,
    announcements,
    notifications,

    isGettingFSR,
    isGettingNotifications,
    isGettingAnnouncements,
  } = state.serviceRecords;
  const { user } = state.app;

  return {
    fsr,
    user,
    announcements,
    notifications,

    isGettingFSR,
    isGettingNotifications,
    isGettingAnnouncements,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFSRs: id => {
      dispatch(getFSRs(id));
    },
    pushLink: route => {
      dispatch(push(route));
    },
    getAnnouncements: () => {
      dispatch(getAnnouncements());
    },
    getNotifications: () => {
      dispatch(getNotifications());
    },
  };
};

const ServiceRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(
  ServiceRecords,
);
export default ServiceRecordsContainer;
