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
  adminWorks: [],
  adminWork: {},
  extAndCommServices: [],
  extAndCommService: {},
  studyLoad: {},
  courses: [],
  course: {},
  courseScheds: [],
  ltdPractOfProf: {},
  award: {},
  consultationHours: [],
  consultationHour: {},
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
  isGettingAdminWorks: false,
  isAddingAdminWork: false,
  isDeletingAdminWork: false,
  isEditingAdminWork: false,
  isGettingExtAndCommServices: false,
  isAddingExtAndCommService: false,
  isDeletingExtAndCommService: false,
  isEditingExtAndCommService: false,
  isGettingStudyLoad: false,
  isEditingStudyLoad: false,
  isGettingCourses: false,
  isAddingCourse: false,
  isDeletingCourse: false,
  isEditingCourse: false,
  isGettingCourseScheds: false,
  isAddingCourseSched: false,
  isEditingCourseSched: false,
  isGettingLtdPractOfProf: false,
  isEditingLtdPractOfProf: false,
  isGettingAward: false,
  isEditingAward: false,
  isGettingConsultationHours: false,
  isAddingConsultationHour: false,
  isDeletingConsultationHour: false,
  isEditingConsultationHour: false,

  isAddSubjectModalOpen: false,
  isEditSubjectModalOpen: false,
  isAddCWorkModalOpen: false,
  isEditCWorkModalOpen: false,
  isAddResearchModalOpen: false,
  isEditResearchModalOpen: false,
  isAddAdminWorkModalOpen: false,
  isEditAdminWorkModalOpen: false,
  isAddExtAndCommServiceModalOpen: false,
  isEditExtAndCommServiceModalOpen: false,
  isAddCourseModalOpen: false,
  isEditCourseModalOpen: false,
  isAddConsultationHourModalOpen: false,
  isEditConsultationHourModalOpen: false,

  isTurningIn: false,
  isFinalizing: false,
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
          currentStep: 0,
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

    case Action.GET_ADMINWORKS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingAdminWorks: true,
        }),
        success: prevState => ({
          ...prevState,
          adminWorks: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingAdminWorks: false,
        }),
      });

    case Action.ADD_ADMINWORK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingAdminWork: true,
        }),
        success: prevState => ({
          ...prevState,
          adminWorks: [...state.adminWorks, payload.data.data],
          isAddAdminWorkModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingAdminWork: false,
        }),
      });

    case Action.DELETE_ADMINWORK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingAdminWork: true,
        }),
        success: prevState => ({
          ...prevState,
          adminWorks: state.adminWorks.filter(
            adminWork =>
              adminWork.adminWorkID !== payload.data.data.adminWorkID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingAdminWork: false,
        }),
      });

    case Action.EDIT_ADMINWORK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingAdminWork: true,
        }),
        success: prevState => ({
          ...prevState,
          adminWorks: state.adminWorks.map(
            adminWork =>
              adminWork.adminWorkID === payload.data.data.adminWorkID
                ? { ...payload.data.data }
                : adminWork,
          ),
          isEditAdminWorkModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingAdminWork: false,
        }),
      });

    case Action.GET_EXTANDCOMMSERVICES:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingExtAndCommServices: true,
        }),
        success: prevState => ({
          ...prevState,
          extAndCommServices: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingExtAndCommServices: false,
        }),
      });

    case Action.ADD_EXTANDCOMMSERVICE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingExtAndCommService: true,
        }),
        success: prevState => ({
          ...prevState,
          extAndCommServices: [...state.extAndCommServices, payload.data.data],
          isAddExtAndCommServiceModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingExtAndCommService: false,
        }),
      });

    case Action.DELETE_EXTANDCOMMSERVICE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingExtAndCommService: true,
        }),
        success: prevState => ({
          ...prevState,
          extAndCommServices: state.extAndCommServices.filter(
            extAndCommService =>
              extAndCommService.extAndCommServiceID !==
              payload.data.data.extAndCommServiceID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingExtAndCommService: false,
        }),
      });

    case Action.EDIT_EXTANDCOMMSERVICE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingExtAndCommService: true,
        }),
        success: prevState => ({
          ...prevState,
          extAndCommServices: state.extAndCommServices.map(
            extAndCommService =>
              extAndCommService.extAndCommServiceID ===
              payload.data.data.extAndCommServiceID
                ? { ...payload.data.data }
                : extAndCommService,
          ),
          isEditExtAndCommServiceModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingExtAndCommService: false,
        }),
      });

    case Action.GET_STUDYLOAD:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingStudyLoad: true,
        }),
        success: prevState => ({
          ...prevState,
          studyLoad: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingStudyLoad: false,
        }),
      });

    case Action.EDIT_STUDYLOAD:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingStudyLoad: true,
        }),
        success: prevState => ({
          ...prevState,
          studyLoad: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingStudyLoad: false,
        }),
      });

    case Action.GET_COURSES:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingCourses: true,
        }),
        success: prevState => ({
          ...prevState,
          courses: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingCourses: false,
        }),
      });

    case Action.ADD_COURSE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingCourse: true,
        }),
        success: prevState => ({
          ...prevState,
          course: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingCourse: false,
        }),
      });

    case Action.DELETE_COURSE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingCourse: true,
        }),
        success: prevState => ({
          ...prevState,
          courses: state.courses.filter(
            course => course.courseID !== payload.data.data.courseID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingCourse: false,
        }),
      });

    case Action.EDIT_COURSE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingCourse: true,
        }),
        success: prevState => ({
          ...prevState,
          courses: state.courses.map(
            course =>
              course.courseID === payload.data.data.courseID
                ? { ...payload.data.data }
                : course,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isEditingCourse: false,
        }),
      });

    case Action.ADD_COURSESCHED:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingCourseSched: true,
        }),
        success: prevState => ({
          ...prevState,
          isAddCourseModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingCourseSched: false,
        }),
      });

    case Action.EDIT_COURSESCHED:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingCourseSched: true,
        }),
        success: prevState => ({
          ...prevState,
          isEditCourseModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingCourseSched: false,
        }),
      });

    case Action.GET_COURSESCHEDS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingCourseScheds: true,
        }),
        success: prevState => ({
          ...prevState,
          courseScheds: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingCourseScheds: false,
        }),
      });

    case Action.GET_LTDPRACTOFPROFS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingLtdPractOfProf: true,
        }),
        success: prevState => ({
          ...prevState,
          ltdPractOfProf: payload.data.data[0],
        }),
        finish: prevState => ({
          ...prevState,
          isGettingLtdPractOfProf: false,
        }),
      });

    case Action.EDIT_LTDPRACTOFPROF:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingLtdPractOfProf: true,
        }),
        success: prevState => ({
          ...prevState,
          ltdPractOfProf: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingLtdPractOfProf: false,
        }),
      });

    case Action.GET_AWARDS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingAward: true,
        }),
        success: prevState => ({
          ...prevState,
          award: payload.data.data[0],
        }),
        finish: prevState => ({
          ...prevState,
          isGettingAward: false,
        }),
      });

    case Action.EDIT_AWARD:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingAward: true,
        }),
        success: prevState => ({
          ...prevState,
          award: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingAward: false,
        }),
      });

    case Action.GET_CONSULTATIONHOURS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingConsultationHours: true,
        }),
        success: prevState => ({
          ...prevState,
          consultationHours: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingConsultationHours: false,
        }),
      });

    case Action.ADD_CONSULTATIONHOUR:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingConsultationHour: true,
        }),
        success: prevState => ({
          ...prevState,
          consultationHours: [...state.consultationHours, payload.data.data],
          isAddConsultationHourModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingCourse: false,
        }),
      });

    case Action.DELETE_CONSULTATIONHOUR:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingConsultationHour: true,
        }),
        success: prevState => ({
          ...prevState,
          consultationHours: state.consultationHours.filter(
            consultationHour =>
              consultationHour.chID !== payload.data.data.chID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingConsultationHour: false,
        }),
      });

    case Action.EDIT_CONSULTATIONHOUR:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingConsultationHour: true,
        }),
        success: prevState => ({
          ...prevState,
          consultationHours: state.consultationHours.map(
            consultationHour =>
              consultationHour.chID === payload.data.data.chID
                ? { ...payload.data.data }
                : consultationHour,
          ),
          isEditConsultationHourModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingConsultationHour: false,
        }),
      });

    case Action.TURN_IN:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isTurningIn: true,
        }),
        success: prevState => ({
          ...prevState,
          fsr: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isTurningIn: false,
        }),
      });

    case Action.FINALIZE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isFinalizing: true,
        }),
        success: prevState => ({
          ...prevState,
          fsr: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isFinalizing: false,
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
        case Action.ADD_ADMINWORK_MODAL:
          return {
            ...state,
            isAddAdminWorkModalOpen: !state.isAddAdminWorkModalOpen,
          };
        case Action.EDIT_ADMINWORK_MODAL:
          return {
            ...state,
            isEditAdminWorkModalOpen: !state.isEditAdminWorkModalOpen,
          };
        case Action.ADD_EXTANDCOMMSERVICE_MODAL:
          return {
            ...state,
            isAddExtAndCommServiceModalOpen: !state.isAddExtAndCommServiceModalOpen,
          };
        case Action.EDIT_EXTANDCOMMSERVICE_MODAL:
          return {
            ...state,
            isEditExtAndCommServiceModalOpen: !state.isEditExtAndCommServiceModalOpen,
          };
        case Action.ADD_COURSE_MODAL:
          return {
            ...state,
            isAddCourseModalOpen: !state.isAddCourseModalOpen,
          };
        case Action.EDIT_COURSE_MODAL:
          return {
            ...state,
            isEditCourseModalOpen: !state.isEditCourseModalOpen,
          };
        case Action.ADD_CONSULTATIONHOUR_MODAL:
          return {
            ...state,
            isAddConsultationHourModalOpen: !state.isAddConsultationHourModalOpen,
          };
        case Action.EDIT_CONSULTATIONHOUR_MODAL:
          return {
            ...state,
            isEditConsultationHourModalOpen: !state.isEditConsultationHourModalOpen,
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
        case Action.ADMINWORK:
          return { ...state, adminWork: payload.data };
        case Action.EXTANDCOMMSERVICE:
          return { ...state, extAndCommService: payload.data };
        case Action.COURSE:
          return { ...state, course: payload.data };
        case Action.CONSULTATIONHOUR:
          return { ...state, consultationHour: payload.data };

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
