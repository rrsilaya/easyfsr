import { connect } from 'react-redux';
import FsrExport from './FsrExport';

import { push } from 'react-router-redux';
import { getFSR } from './duck';

const mapStateToProps = state => {
  const { fsr, isGettingFSR } = state.fsrExport;

  return {
    fsr,
    isGettingFSR,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFSR: id => {
      dispatch(getFSR(id));
    },
    pushState: link => {
      dispatch(push(link));
    },
  };
};

const FsrExportContainer = connect(mapStateToProps, mapDispatchToProps)(
  FsrExport,
);
export default FsrExportContainer;
