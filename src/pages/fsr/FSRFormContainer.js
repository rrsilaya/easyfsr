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
  changeSelected,
  getTimeslots,
  getResearches,
  addResearch,
  deleteResearch,
  editResearch,
  getCreativeWorks,
  addCreativeWork,
  deleteCreativeWork,
  editCreativeWork,
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
    isEditResearchModalOpen,
    isEditCWorkModalOpen,
    currentStep,
    fsr,
    subjects,
    subject,
    timeslots,
    researches,
    research,
    cworks,
    cwork,
    isGettingFSR,
    isGettingSubjects,
    isAddingSubject,
    isAddingTimeslot,
    isEditingSubject,
    isGettingTimeslots,
    isGettingResearches,
    isAddingResearch,
    isEditingResearch,
    isGettingCWorks,
    isAddingCWork,
    isEditingCWork,
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
    isEditResearchModalOpen,
    isEditCWorkModalOpen,
    currentStep,
    fsr,
    subjects,
    subject,
    timeslots,
    researches,
    research,
    cworks,
    cwork,
    isGettingFSR,
    isGettingSubjects,
    isAddingSubject,
    isAddingTimeslot,
    isEditingSubject,
    isGettingTimeslots,
    isGettingResearches,
    isAddingResearch,
    isEditingResearch,
    isGettingCWorks,
    isAddingCWork,
    isEditingCWork,
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
    changeSelected: data => {
      dispatch(changeSelected(data));
    },
    getTimeslots: query => {
      dispatch(getTimeslots(query));
    },
    getResearches: query => {
      dispatch(getResearches(query));
    },
    addResearch: research => {
      dispatch(addResearch(research));
    },
    deleteResearch: researchID => {
      dispatch(deleteResearch(researchID));
    },
    editResearch: (researchID, body) => {
      dispatch(editResearch(researchID, body));
    },
    getCreativeWorks: query => {
      dispatch(getCreativeWorks(query));
    },
    addCreativeWork: cwork => {
      dispatch(addCreativeWork(cwork));
    },
    deleteCreativeWork: creativeWorkID => {
      dispatch(deleteCreativeWork(creativeWorkID));
    },
    editCreativeWork: (creativeWorkID, body) => {
      dispatch(editCreativeWork(creativeWorkID, body));
    },
  };
};

const FSRFormContainer = connect(mapStateToProps, mapDispatchToProps)(FSRForm);
export default FSRFormContainer;
