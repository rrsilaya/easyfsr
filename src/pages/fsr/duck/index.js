import { handle } from 'redux-pack';
import * as Action from './actionTypes';

const initialState = {
  fsr: {},
  subjects: [],
  subject: {},
  timeslots: [],
  researches: [],
  research: {},
  cworks: [],
  currentStep: 0,

  isGettingFSR: false,
  isGettingSubjects: false,
  isGettingTimeslots: false,
  isAddingSubject: false,
  isAddingTimeslot: false,
  isDeletingSubject: false,
  isEditingSubject: false,
  isEditingTimeslot: false,
  isGettingResearches: false,
  isAddingResearch: false,
  isGettingCWorks: false,

  isAddSubjectModalOpen: false,
  isEditSubjectModalOpen: false,

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
          fsr: payload.data.data.fsr,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingFSR: false,
        }),
      });

    case Action.GET_SUBJECTS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingSubjects: true,
        }),
        success: prevState => ({
          ...prevState,
          subjects: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingSubjects: false,
        }),
      });

    case Action.ADD_SUBJECT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingSubject: true,
        }),
        success: prevState => ({
          ...prevState,
          subject: payload.data.data,
          subjects: [...state.subjects, payload.data.data],
        }),
        finish: prevState => ({
          ...prevState,
          isAddingSubject: false,
        }),
      });

    case Action.ADD_TIMESLOT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingTimeslot: true,
        }),
        success: prevState => ({
          ...prevState,
          isAddSubjectModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingTimeslot: false,
        }),
      });

    case Action.DELETE_SUBJECT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingSubject: true,
        }),
        success: prevState => ({
          ...prevState,
          subjects: state.subjects.filter(
            subject => subject.subjectID !== payload.data.data.subjectID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingSubject: false,
        }),
      });

    case Action.EDIT_SUBJECT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingSubject: true,
        }),
        success: prevState => ({
          ...prevState,
          subjects: state.subjects.map(
            subject =>
              subject.subjectID === payload.data.data.subjectID
                ? { ...payload.data.data }
                : subject,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isEditingSubject: false,
        }),
      });

    case Action.EDIT_TIMESLOT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingTimeslot: true,
        }),
        success: prevState => ({
          ...prevState,
          isEditSubjectModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingTimeslot: false,
        }),
      });

    case Action.CHANGE_SELECTED_SUBJECT:
      return {
        ...state,
        subject: payload,
      };

    case Action.GET_TIMESLOTS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingTimeslots: true,
        }),
        success: prevState => ({
          ...prevState,
          timeslots: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingTimeslots: false,
        }),
      });

    case Action.GET_RESEARCHES:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingResearches: true,
        }),
        success: prevState => ({
          ...prevState,
          researches: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingResearches: false,
        }),
      });

    case Action.ADD_RESEARCH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingResearch: true,
        }),
        success: prevState => ({
          ...prevState,
          research: payload.data.data,
          researches: [...state.researches, payload.data.data],
        }),
        finish: prevState => ({
          ...prevState,
          isAddingResearch: false,
        }),
      });

    case Action.GET_CWORKS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingCWorks: true,
        }),
        success: prevState => ({
          ...prevState,
          cworks: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingCWorks: false,
        }),
      });

    case Action.TOGGLE_MODAL:
      switch (payload) {
        case Action.ADD_SUBJECT_MODAL:
          return {
            ...state,
            isAddSubjectModalOpen: !state.isAddSubjectModalOpen,
          };
        case Action.EDIT_SUBJECT_MODAL:
          return {
            ...state,
            isEditSubjectModalOpen: !state.isEditSubjectModalOpen,
          };
        case Action.CWORK:
          return { ...state, isAddCWorkModalOpen: !state.isAddCWorkModalOpen };
        case Action.RESEARCH:
          return {
            ...state,
            isAddResearchModalOpen: !state.isAddResearchModalOpen,
          };
        case Action.ADMINWORK:
          return {
            ...state,
            isAddAdminWorkModalOpen: !state.isAddAdminWorkModalOpen,
          };
        case Action.EXTANDCOMMSERVICE:
          return {
            ...state,
            isAddExtAndCommServiceModalOpen: !state.isAddExtAndCommServiceModalOpen,
          };
        case Action.COURSE:
          return {
            ...state,
            isAddCourseModalOpen: !state.isAddCourseModalOpen,
          };
        case Action.CONSULTATIONHOUR:
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
