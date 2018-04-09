import { handle } from 'redux-pack';
import * as Action from './actionTypes';

const initialState = {
  fsr: {},
  currentStep: 0,

  isGettingFSR: false,

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
    case Action.GET_FSR:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingFSR: true,
        }),
        success: prevState => ({
          ...prevState,
          fsr: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingFSR: false,
        }),
      });

    case Action.TOGGLE_MODAL:
      switch (payload) {
        case Action.ADD_SUBJECT:
          return {
            ...state,
            isAddSubjectModalOpen: !state.isAddSubjectModalOpen,
          };
        case Action.ADD_CWORK:
          return { ...state, isAddCWorkModalOpen: !state.isAddCWorkModalOpen };
        case Action.ADD_RESEARCH:
          return {
            ...state,
            isAddResearchModalOpen: !state.isAddResearchModalOpen,
          };
        case Action.ADD_ADMINWORK:
          return {
            ...state,
            isAddAdminWorkModalOpen: !state.isAddAdminWorkModalOpen,
          };
        case Action.ADD_EXTANDCOMMSERVICE:
          return {
            ...state,
            isAddExtAndCommServiceModalOpen: !state.isAddExtAndCommServiceModalOpen,
          };
        case Action.ADD_COURSE:
          return {
            ...state,
            isAddCourseModalOpen: !state.isAddCourseModalOpen,
          };
        case Action.ADD_CONSULTATIONHOUR:
          return {
            ...state,
            isAddConsultationHourModalOpen: !state.isAddConsultationHourModalOpen,
          };
        default:
          return state;
      }

    case Action.NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case Action.PREVIOUS_STEP:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };

    default:
      return state;
  }
};

export * from './actionCreators';
export * from './actionTypes';
export default reducer;
