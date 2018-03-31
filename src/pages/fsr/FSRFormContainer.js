import { connect } from 'react-redux';
import FSRForm from './FSRForm';

import {
  toggleAddSubjectModal,
  toggleAddCWorkModal,
  toggleAddResearchModal,
  toggleAddAdminWorkModal,
  toggleAddExtAndCommServiceModal,
  toggleAddCourseModal,
  toggleAddConsultationHourModal,
  nextStep,
  prevStep,
} from './duck';

const mapStateToProps = state => {
  const {
    isAddSubjectModalOpen,
    isAddCWorkModalOpen,
    isAddResearchModalOpen,
    isAddAdminWorkModalOpen,
    isAddExtAndCommServiceModalOpen,
    isAddCourseModalOpen,
    isAddConsultationHourModalOpen,
    currentStep,
  } = state.fsr;

  return {
    isAddSubjectModalOpen,
    isAddCWorkModalOpen,
    isAddResearchModalOpen,
    isAddAdminWorkModalOpen,
    isAddExtAndCommServiceModalOpen,
    isAddCourseModalOpen,
    isAddConsultationHourModalOpen,
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
    toggleAddAdminWorkModal: () => {
      dispatch(toggleAddAdminWorkModal());
    },
    toggleAddExtAndCommServiceModal: () => {
      dispatch(toggleAddExtAndCommServiceModal());
    },
    toggleAddCourseModal: () => {
      dispatch(toggleAddCourseModal());
    },
    toggleAddConsultationHourModal: () => {
      dispatch(toggleAddConsultationHourModal());
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
