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
  cwork: {},
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
  isDeletingResearch: false,
  isEditingResearch: false,
  isGettingCWorks: false,
  isAddingCWork: false,
  isDeletingCWork: false,
  isEditingCWork: false,

  isAddSubjectModalOpen: false,
  isEditSubjectModalOpen: false,

  isAddCWorkModalOpen: false,
  isEditCWorkModalOpen: false,

  isAddResearchModalOpen: false,
  isEditResearchModalOpen: false,

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
          researches: [...state.researches, payload.data.data],
          isAddResearchModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingResearch: false,
        }),
      });

    case Action.DELETE_RESEARCH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingResearch: true,
        }),
        success: prevState => ({
          ...prevState,
          researches: state.researches.filter(
            research => research.researchID !== payload.data.data.researchID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingResearch: false,
        }),
      });

    case Action.EDIT_RESEARCH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingResearch: true,
        }),
        success: prevState => ({
          ...prevState,
          researches: state.researches.map(
            research =>
              research.researchID === payload.data.data.researchID
                ? { ...payload.data.data }
                : research,
          ),
          isEditResearchModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingResearch: false,
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

    case Action.ADD_CWORK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingCWork: true,
        }),
        success: prevState => ({
          ...prevState,
          cworks: [...state.cworks, payload.data.data],
          isAddCWorkModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingCWork: false,
        }),
      });

    case Action.DELETE_CWORK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingCWork: true,
        }),
        success: prevState => ({
          ...prevState,
          cworks: state.cworks.filter(
            cwork => cwork.creativeWorkID !== payload.data.data.creativeWorkID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingCWork: false,
        }),
      });

    case Action.EDIT_CWORK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingCWork: true,
        }),
        success: prevState => ({
          ...prevState,
          cworks: state.cworks.map(
            cwork =>
              cwork.creativeWorkID === payload.data.data.creativeWorkID
                ? { ...payload.data.data }
                : cwork,
          ),
          isEditCWorkModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingCWork: false,
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
        case Action.ADD_CWORK_MODAL:
          return { ...state, isAddCWorkModalOpen: !state.isAddCWorkModalOpen };
        case Action.EDIT_CWORK_MODAL:
          return {
            ...state,
            isEditCWorkModalOpen: !state.isEditCWorkModalOpen,
          };
        case Action.ADD_RESEARCH_MODAL:
          return {
            ...state,
            isAddResearchModalOpen: !state.isAddResearchModalOpen,
          };
        case Action.EDIT_RESEARCH_MODAL:
          return {
            ...state,
            isEditResearchModalOpen: !state.isEditResearchModalOpen,
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

    case Action.CHANGE_SELECTED:
      switch (payload.entity) {
        case Action.SUBJECT:
          return { ...state, subject: payload.data };
        case Action.RESEARCH:
          return { ...state, research: payload.data };
        case Action.CWORK:
          return { ...state, cwork: payload.data };

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
