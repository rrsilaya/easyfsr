import { connect } from 'react-redux';
import ServiceRecords from './ServiceRecords';

import { push } from 'react-router-redux';
import { getFSRs, getAnnouncements, getNotifications } from './duck';

const mapStateToProps = state => {
  const {
    fsr,
    isGettingFSR,
    notifications,
    isGettingNotifications,
    announcements,
    isGettingAnnouncements,
  } = state.serviceRecords;

  return {
    fsr,
    isGettingFSR,
    announcements,
    isGettingAnnouncements,
    notifications,
    isGettingNotifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFSRs: () => {
      dispatch(getFSRs());
    },
    getNotifications: query => {
      dispatch(getNotifications(query));
    },
    getAnnouncements: query => {
      dispatch(getAnnouncements(query));
    },
    pushLink: route => {
      dispatch(push(route));
    },
  };
};

const ServiceRecordsContainer = connect(mapStateToProps, mapDispatchToProps)(
  ServiceRecords,
);
export default ServiceRecordsContainer;
