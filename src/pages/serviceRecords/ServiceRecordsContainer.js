import { connect } from 'react-redux';
import ServiceRecords from './ServiceRecords';

import { push } from 'react-router-redux';
import { getFSRs, getAnnouncements, getNotifications } from './duck';

const mapStateToProps = state => {
  const {
    fsr,
    isGettingFSR,
    announcements,
    notifications,
  } = state.serviceRecords;
  const { user } = state.app;

  return {
    fsr,
    isGettingFSR,
    user,
    announcements,
    notifications,
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
