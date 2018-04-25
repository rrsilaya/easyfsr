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
const CHANGE_SELECTED_USERS = 'DASHBOARD/CHANGE_SELECTED_USERS';
const ADD_NOTIFICATION = 'DASHBOARD/ADD_NOTIFICATION';
const DELETE_NOTIFICATION = 'DASHBOARD/DELETE_NOTIFICATION';
export const ADD_ANNOUNCEMENT = 'DASHBOARD/ADD_ANNOUNCEMENT';
export const DELETE_ANNOUNCEMENT = 'DASHBOARD/DELETE_ANNOUNCEMENT';
const GET_ANNOUNCEMENTS = 'DASHBOARD/GET_ANNOUNCEMENTS';
const GET_NOTIFICATIONS = 'DASHBOARD/GET_NOTIFICATIONS';
export const GET_LOG = 'DASHBOARD/GET_LOGS';
export const ADD_META = 'DASHBOARD/ADD_META';
export const GET_META = 'DASHBOARD/GET_META';
const TOGGLE_MODAL = 'DASHBOARD/TOGGLE_MODAL';
const ADD_FSR = 'DASHBOARD/ADD_FSR';

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

export const getLog = query => {
  return dispatch => {
    return dispatch({
      type: GET_LOG,
      promise: Api.getLog(query),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Error while getting logs.',
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

export const changeSelectedUsers = user => ({
  type: CHANGE_SELECTED_USERS,
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
          dispatch(getNotifications({ isResolved: 0 }));
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

export const deleteNotification = id => {
  return dispatch => {
    return dispatch({
      type: DELETE_NOTIFICATION,
      promise: Api.deleteNotification(id),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully deleted notification.',
          });
          dispatch(getNotifications({ isResolved: 0 }));
        },
        onFailure: () => {
          notification.error({
            message: 'Error while deleting notification.',
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
          dispatch(getAnnouncements());
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

export const deleteAnnouncement = id => {
  return dispatch => {
    return dispatch({
      type: DELETE_ANNOUNCEMENT,
      promise: Api.deleteAnnouncement(id),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully deleted announcement.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Error while deleting announcement.',
          });
        },
      },
    });
  };
};

export const addMetaData = body => {
  return (dispatch, getState) => {
    return dispatch({
      type: ADD_META,
      promise: Api.addMetaData(body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Settings successfully changed.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while changing settings.',
          });
        },
      },
    });
  };
};

export const getMetaData = query => {
  return dispatch => {
    return dispatch({
      type: GET_META,
      promise: Api.getMeta(query),
      meta: {
        onFailure: () => {
          notification.error({
            message: 'Server error while fetching meta data.',
          });
        },
      },
    });
  };
};

export const addFSR = body => {
  return dispatch => {
    return dispatch({
      type: ADD_FSR,
      promise: Api.addFSR(body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully added FSR/s.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while adding FSR/s.',
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
  isDeletingAnnouncement: false,
  isDeletingNotification: false,
  isAddingMeta: false,
  isGettingMeta: false,
  isAddingFSR: false,

  isGettingsLogs: false,
  isGettingAnnouncements: true,
  isGettingNotifications: true,
  searchedUsers: [],
  selectedUsers: [],
  users: [],
  log: [],
  meta: {},
  announcements: [],
  notifications: [],
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

    case DELETE_NOTIFICATION:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingNotification: true,
        }),
        success: prevState => ({
          ...prevState,
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingNotification: false,
        }),
      });

    case ADD_META:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingMeta: true,
        }),
        success: prevState => ({
          ...prevState,
          isSettingsModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingMeta: false,
        }),
      });

    case GET_META:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingMeta: true,
        }),
        success: prevState => ({
          ...prevState,
          meta: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingMeta: false,
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

    case DELETE_ANNOUNCEMENT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingAnnouncement: true,
        }),
        success: prevState => ({
          ...prevState,
          announcements: prevState.announcements.filter(
            announcement =>
              payload.data.data.announcementID !== announcement.announcementID,
          ),
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingAnnouncement: false,
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

    case CHANGE_SELECTED_USERS:
      return {
        ...state,
        selectedUsers: payload,
      };
    case GET_LOG:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingLogs: true,
        }),
        success: prevState => ({
          ...prevState,
          log: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingLogs: false,
        }),
      });

    case ADD_FSR:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingFSR: true,
        }),
        success: prevState => ({
          ...prevState,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingFSR: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
