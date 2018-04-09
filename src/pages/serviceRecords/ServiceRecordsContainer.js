import { connect } from 'react-redux';
import ServiceRecords from './ServiceRecords';

import { push } from 'react-router-redux';
import { getFSRs } from './duck';

const mapStateToProps = state => {
  const { fsr, isGettingFSR } = state.serviceRecords;

  return {
    fsr,
    isGettingFSR,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFSRs: () => {
      dispatch(getFSRs());
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
