import { handle } from 'redux-pack';
import * as Api from '../../api';

// Constants
export const ADD_SUBJECT = 'ADD_SUBJECT';
export const ADD_CWORK = 'ADD_CWORK';
export const ADD_RESEARCH = 'ADD_RESEARCH';
export const ADD_ADMINWORK = 'ADD_ADMINWORK';
export const ADD_EXTANDCOMMSERVICE = 'ADD_EXTANDCOMMSERVICE';
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_CONSULTATIONHOUR = 'ADD_CONSULTATIONHOUR';

// Action Types
const TOGGLE_MODAL = 'FSR/TOGGLE_MODAL';
const NEXT_STEP = 'FSR/NEXT_STEP';
const PREVIOUS_STEP = 'FSR/PREVIOUS_STEP';

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal,
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
    case TOGGLE_MODAL:
      switch (payload) {
        case ADD_SUBJECT:
          return {
            ...state,
            isAddSubjectModalOpen: !state.isAddSubjectModalOpen,
          };
        case ADD_CWORK:
          return { ...state, isAddCWorkModalOpen: !state.isAddCWorkModalOpen };
        case ADD_RESEARCH:
          return {
            ...state,
            isAddResearchModalOpen: !state.isAddResearchModalOpen,
          };
        case ADD_ADMINWORK:
          return {
            ...state,
            isAddAdminWorkModalOpen: !state.isAddAdminWorkModalOpen,
          };
        case ADD_EXTANDCOMMSERVICE:
          return {
            ...state,
            isAddExtAndCommServiceModalOpen: !state.isAddExtAndCommServiceModalOpen,
          };
        case ADD_COURSE:
          return {
            ...state,
            isAddCourseModalOpen: !state.isAddCourseModalOpen,
          };
        case ADD_CONSULTATIONHOUR:
          return {
            ...state,
            isAddConsultationHourModalOpen: !state.isAddConsultationHourModalOpen,
          };
        default:
          return state;
      }

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
