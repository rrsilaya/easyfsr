import { handle } from 'redux-pack';
import * as Api from '../../api';

// Action Types
const TOGGLE_ADD_SUBJECT_MODAL = 'FSR/TOGGLE_ADD_SUBJECT_MODAL';
const TOGGLE_ADD_CWORK_MODAL = 'FSR/TOGGLE_ADD_CWORK_MODAL';
const TOGGLE_ADD_RESEARCH_MODAL = 'FSR/TOGGLE_ADD_RESEARCH_MODAL';
const TOGGLE_ADD_ADMINWORK_MODAL = 'FSR/TOGGLE_ADD_ADMINWORK_MODAL';
const TOGGLE_ADD_EXTANDCOMMSERVICE_MODAL =
  'FSR/TOGGLE_ADD_EXTANDCOMMSERVICE_MODAL';
const TOGGLE_ADD_COURSE_MODAL = 'FSR/TOGGLE_ADD_COURSE_MODAL';
const TOGGLE_ADD_CONSULTATIONHOUR_MODAL =
  'FSR/TOGGLE_ADD_CONSULTATIONHOUR_MODAL';
const NEXT_STEP = 'FSR/NEXT_STEP';
const PREVIOUS_STEP = 'FSR/PREVIOUS_STEP';

export const toggleAddSubjectModal = () => ({
  type: TOGGLE_ADD_SUBJECT_MODAL,
});

export const toggleAddCWorkModal = () => ({
  type: TOGGLE_ADD_CWORK_MODAL,
});

export const toggleAddResearchModal = () => ({
  type: TOGGLE_ADD_RESEARCH_MODAL,
});

export const toggleAddAdminWorkModal = () => ({
  type: TOGGLE_ADD_ADMINWORK_MODAL,
});

export const toggleAddExtAndCommServiceModal = () => ({
  type: TOGGLE_ADD_EXTANDCOMMSERVICE_MODAL,
});

export const toggleAddCourseModal = () => ({
  type: TOGGLE_ADD_COURSE_MODAL,
});

export const toggleAddConsultationHourModal = () => ({
  type: TOGGLE_ADD_CONSULTATIONHOUR_MODAL,
});

export const nextStep = () => ({
  type: NEXT_STEP,
});

export const prevStep = () => ({
  type: PREVIOUS_STEP,
});

const initialState = {
  currentStep: 0,

  isAddSubjectModalOpen: false,
  isAddCWorkModalOpen: false,
  isAddResearchModalOpen: false,
  isAddAdminWorkModalOpen: false,
  isAddExtAndCommServiceModalOpen: false,
  isAddCourseModalOpen: false,
  isAddConsultationHourModalOpen: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_ADD_SUBJECT_MODAL:
      return {
        ...state,
        isAddSubjectModalOpen: !state.isAddSubjectModalOpen,
      };

    case TOGGLE_ADD_CWORK_MODAL:
      return {
        ...state,
        isAddCWorkModalOpen: !state.isAddCWorkModalOpen,
      };

    case TOGGLE_ADD_RESEARCH_MODAL:
      return {
        ...state,
        isAddResearchModalOpen: !state.isAddResearchModalOpen,
      };

    case TOGGLE_ADD_ADMINWORK_MODAL:
      return {
        ...state,
        isAddAdminWorkModalOpen: !state.isAddAdminWorkModalOpen,
      };

    case TOGGLE_ADD_EXTANDCOMMSERVICE_MODAL:
      return {
        ...state,
        isAddExtAndCommServiceModalOpen: !state.isAddExtAndCommServiceModalOpen,
      };

    case TOGGLE_ADD_COURSE_MODAL:
      return {
        ...state,
        isAddCourseModalOpen: !state.isAddCourseModalOpen,
      };

    case TOGGLE_ADD_CONSULTATIONHOUR_MODAL:
      return {
        ...state,
        isAddConsultationHourModalOpen: !state.isAddConsultationHourModalOpen,
      };

    case NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case PREVIOUS_STEP:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };

    default:
      return state;
  }
};

export default reducer;
