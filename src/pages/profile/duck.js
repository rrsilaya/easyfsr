import { handle } from 'redux-pack';
import { notification } from 'antd';
import { push } from 'react-router-redux';
import * as Api from '../../api';
import { updateProfileIcon } from '../../app/duck';

// Constants
export const SCHEDULE_MODAL = 'SCHEDULE_MODAL';

// Action Types
const GET_USER = 'PROFILE/GET_USER';
const GET_ADMIN_WORK = 'PROFILE/GET_ADMIN_WORK';
const GET_EXT_AND_COMM_SERVICE = 'PROFILE/GET_EXT_AND_COMM_SERVICE';
const UPLOAD_ICON = 'PROFILE/UPLOAD_ICON';
const TOGGLE_MODAL = 'PROFILE/TOGGLE_MODAL';
const GET_USER_SCHEDULE = 'PROFILE/GET_USER_SCHEDULE';
const RESET_PAGE = 'PROFILE/RESET_PAGE';
const GET_RESEARCH = 'PROFILE/GET_RESEARCH';
const GET_AWARD = 'PROFILE/GET_AWARD';

// Action Creators
export const getUserProfile = employeeID => dispatch => {
  dispatch({
    type: GET_USER,
    promise: Api.getUser(employeeID),
    meta: {
      onFailure: () => {
        notification.error({
          message: 'An error occured while getting user profile',
        });
        dispatch(push('/profile'));
      },
    },
  });
};

export const getAdminWork = employeeID => dispatch => {
  dispatch({
    type: GET_ADMIN_WORK,
    promise: Api.getAdminWork(employeeID),
    meta: {
      onFailure: () => {
        notification.error({
          message: 'An error occured while getting admin work',
        });
      },
    },
  });
};

export const getUserExtensionAndCommService = employeeID => dispatch => {
  dispatch({
    type: GET_EXT_AND_COMM_SERVICE,
    promise: Api.getUserExtensionAndCommService(employeeID),
    meta: {
      onFailure: () => {
        notification.error({
          message: 'An error occured while getting Comm Services',
        });
      },
    },
  });
};

export const uploadIcon = (user, form) => {
  const { userID } = user;
  return dispatch => {
    return dispatch({
      type: UPLOAD_ICON,
      promise: Api.editUser(userID, form),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully upload profile icon.',
          });
          dispatch(updateProfileIcon(user, form));
        },
        onFailure: () => {
          notification.error({
            message: 'Server error whle uploading icon.',
          });
        },
      },
    });
  };
};

export const getUserSchedule = user => ({
  type: GET_USER_SCHEDULE,
  promise: Api.getUserSchedule(user),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Server error while getting schedule' });
    },
  },
});

export const getResearch = employeeID => dispatch => {
  dispatch({
    type: GET_RESEARCH,
    promise: Api.getResearch(employeeID),
    meta: {
      onFailure: () => {
        notification.error({
          message: 'An error occured while getting research',
        });
      },
    },
  });
};

export const getAward = employeeID => dispatch => {
  dispatch({
    type: GET_AWARD,
    promise: Api.getAward(employeeID),
    meta: {
      onFailure: () => {
        notification.error({
          message: 'An error occured while getting award',
        });
      },
    },
  });
};

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal,
});

export const resetPage = () => ({
  type: RESET_PAGE,
});

// Initial State
const initialState = {
  isGettingUser: true,
  isUploadingIcon: false,
  isGettingSchedule: true,

  user: {},
  adminWork: [],
  service: [],
  schedule: [],
  award: [],
  research: [],

  isLoadingCards: {
    adminWork: true,
    extAndCommService: true,
    research: true,
    award: true,
  },

  isSchedModalOpen: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          user: payload.data.data,
          isGettingUser: false,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingUser: false,
        }),
      });

    case GET_ADMIN_WORK:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingAdminWork: true,
        }),
        success: prevState => ({
          ...prevState,
          adminWork: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isLoadingCards: {
            ...prevState.isLoadingCards,
            adminWork: false,
          },
        }),
      });

    case GET_EXT_AND_COMM_SERVICE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingExtAndCommService: true,
        }),
        success: prevState => ({
          ...prevState,
          service: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isLoadingCards: {
            ...prevState.isLoadingCards,
            extAndCommService: false,
          },
        }),
      });

    case UPLOAD_ICON:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isUploadingIcon: true,
        }),
        success: prevState => ({
          ...prevState,
          user: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isUploadingIcon: false,
        }),
      });

    case GET_USER_SCHEDULE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingSchedule: true,
        }),
        success: prevState => ({
          ...prevState,
          schedule: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingSchedule: false,
        }),
      });

    case GET_RESEARCH:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingResearch: true,
        }),
        success: prevState => ({
          ...prevState,
          service: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isLoadingCards: {
            ...prevState.isLoadingCards,
            research: false,
          },
        }),
      });

    case GET_AWARD:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingAward: true,
        }),
        success: prevState => ({
          ...prevState,
          service: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isLoadingCards: {
            ...prevState.isLoadingCards,
            award: false,
          },
        }),
      });

    case TOGGLE_MODAL:
      switch (payload) {
        case SCHEDULE_MODAL:
          return {
            ...state,
            isSchedModalOpen: !state.isSchedModalOpen,
          };

        default:
          return state;
      }

    case RESET_PAGE:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
