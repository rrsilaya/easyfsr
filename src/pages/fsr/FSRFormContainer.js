import { connect } from 'react-redux';
import FSRForm from './FSRForm';

import {
  toggleAddSubjectModal,
  toggleAddCWorkModal,
  toggleAddResearchModal,
  nextStep,
  prevStep,
} from './duck';

const mapStateToProps = state => {
  const {
    isAddSubjectModalOpen,
    isAddCWorkModalOpen,
    isAddResearchModalOpen,
    currentStep,
  } = state.fsr;

  return {
    isAddSubjectModalOpen,
    isAddCWorkModalOpen,
    isAddResearchModalOpen,
    currentStep,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAddSubjectModal: () => {
      dispatch(toggleAddSubjectModal());
    },
    toggleAddCWorkModal: () => {
      dispatch(toggleAddCWorkModal());
    },
    toggleAddResearchModal: () => {
      dispatch(toggleAddResearchModal());
    },
    nextStep: () => {
      dispatch(nextStep());
    },
    prevStep: () => {
      dispatch(prevStep());
    },
  };
};

const FSRFormContainer = connect(mapStateToProps, mapDispatchToProps)(FSRForm);
export default FSRFormContainer;
