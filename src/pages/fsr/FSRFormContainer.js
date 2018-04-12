import { connect } from 'react-redux';
import FSRForm from './FSRForm';

import {
  toggleModal,
  nextStep,
  prevStep,
  getFSR,
  getSubjects,
  addSubject,
  deleteSubject,
  editSubject,
  changeSelectedSubject,
  getTimeslots,
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
    isEditSubjectModalOpen,
    currentStep,
    fsr,
    subjects,
    subject,
    timeslots,
    isGettingFSR,
    isGettingSubjects,
    isAddingSubject,
    isAddingTimeslot,
    isEditingSubject,
    isGettingTimeslots,
  } = state.fsr;

  return {
    isAddSubjectModalOpen,
    isAddCWorkModalOpen,
    isAddResearchModalOpen,
    isAddAdminWorkModalOpen,
    isAddExtAndCommServiceModalOpen,
    isAddCourseModalOpen,
    isAddConsultationHourModalOpen,
    isEditSubjectModalOpen,
    currentStep,
    fsr,
    subjects,
    subject,
    timeslots,
    isGettingFSR,
    isGettingSubjects,
    isAddingSubject,
    isAddingTimeslot,
    isEditingSubject,
    isGettingTimeslots,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
    nextStep: () => {
      dispatch(nextStep());
    },
    prevStep: () => {
      dispatch(prevStep());
    },
    getFSR: id => {
      dispatch(getFSR(id));
    },
    getSubjects: query => {
      dispatch(getSubjects(query));
    },
    addSubject: subject => {
      dispatch(addSubject(subject));
    },
    deleteSubject: subjectID => {
      dispatch(deleteSubject(subjectID));
    },
    editSubject: (subjectID, body) => {
      dispatch(editSubject(subjectID, body));
    },
    changeSelectedSubject: subject => {
      dispatch(changeSelectedSubject(subject));
    },
    getTimeslots: query => {
      dispatch(getTimeslots(query));
    },
  };
};

const FSRFormContainer = connect(mapStateToProps, mapDispatchToProps)(FSRForm);
export default FSRFormContainer;
