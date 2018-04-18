import { handle } from 'redux-pack';
import * as Api from '../../api';
import { notification } from 'antd';

// Constants
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const CREATE_FSR = 'CREATE_FSR';
export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT';
export const SETTINGS = 'SETTINGS';

// Action Types
const SEARCH_USER = 'DASHBOARD/SEARCH_USER';
const GET_USERS = 'DASHBOARD/GET_USERS';
const CHANGE_SELECTED_USER = 'DASHBOARD/CHANGE_SELECTED_USER';
const ADD_NOTIFICATION = 'DASHBOARD/ADD_NOTIFICATION';
const ADD_ANNOUNCEMENT = 'DASHBOARD/ADD_ANNOUNCEMENT';
const GET_ANNOUNCEMENTS = 'DASHBOARD/GET_ANNOUNCEMENTS';
const GET_NOTIFICATIONS = 'DASHBOARD/GET_NOTIFICATIONS';
const TOGGLE_MODAL = 'DASHBOARD/TOGGLE_MODAL';

export const getUsers = query => {
  return dispatch => {
    return dispatch({
      type: GET_USERS,
      promise: Api.getUsers(query),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error while getting users.',
          });
        },
      },
    });
  };
};

export const searchUser = query => ({
  type: SEARCH_USER,
  promise: Api.getUsers(query),
});

export const getAnnouncements = query => {
  return dispatch => {
    return dispatch({
      type: GET_ANNOUNCEMENTS,
      promise: Api.getAnnouncements(query),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error while getting announcements.',
          });
        },
      },
    });
  };
};

export const getNotifications = query => {
  return dispatch => {
    return dispatch({
      type: GET_NOTIFICATIONS,
      promise: Api.getNotifications(query),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error while getting notifications.',
          });
        },
      },
    });
  };
};

export const changeSelectedUser = user => ({
  type: CHANGE_SELECTED_USER,
  payload: user,
});

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal,
});

export const addNotification = body => {
  return (dispatch, getState) => {
    return dispatch({
      type: ADD_NOTIFICATION,
      promise: Api.addNotification(body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Notification successfully sent.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while sending notification.',
          });
        },
      },
    });
  };
};

export const addAnnouncement = body => {
  return (dispatch, getState) => {
    return dispatch({
      type: ADD_ANNOUNCEMENT,
      promise: Api.addAnnouncement(body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Announcement successfully sent.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while sending announcement.',
          });
        },
      },
    });
  };
};

const initialState = {
  isSendNotificationModalOpen: false,
  isCreateNotificationModalOpen: false,
  isCreateAnnouncementModalOpen: false,
  isSettingsModalOpen: false,

  isSearchingUsers: false,
  isAddingNotification: false,
  isAddingAnnouncement: false,
  isGettingUsers: false,

  searchedUsers: [],
  users: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MODAL:
      switch (payload) {
        case SEND_NOTIFICATION:
          return {
            ...state,
            isSendNotificationModalOpen: !state.isSendNotificationModalOpen,
          };
        case CREATE_FSR:
          return {
            ...state,
            isCreateFSRModalOpen: !state.isCreateFSRModalOpen,
          };
        case CREATE_ANNOUNCEMENT:
          return {
            ...state,
            isCreateAnnouncementModalOpen: !state.isCreateAnnouncementModalOpen,
          };
        case SETTINGS:
          return {
            ...state,
            isSettingsModalOpen: !state.isSettingsModalOpen,
          };

        default:
          return state;
      }

    case ADD_NOTIFICATION:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingNotification: true,
        }),
        success: prevState => ({
          ...prevState,
          isSendNotificationModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingNotification: false,
        }),
      });

    case SEARCH_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isSearchingUsers: false,
        }),
        success: prevState => ({
          ...prevState,
          searchedUsers: payload.data.data,
        }),
      });

    case ADD_ANNOUNCEMENT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingAnnouncement: true,
        }),
        success: prevState => ({
          ...prevState,
          isCreateAnnouncementModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingAnnouncement: false,
        }),
      });
    case GET_USERS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingUsers: true,
        }),
        success: prevState => ({
          ...prevState,
          users: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingUsers: false,
        }),
      });

    case GET_ANNOUNCEMENTS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingAnnouncements: true,
        }),
        success: prevState => ({
          ...prevState,
          announcements: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingAnnouncements: false,
        }),
      });

    case GET_NOTIFICATIONS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingNotifications: true,
        }),
        success: prevState => ({
          ...prevState,
          notifications: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingNotifications: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
