import { handle } from 'redux-pack';
import * as Api from '../../api';
import { notification } from 'antd';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';

export const CREATE_FSR = 'CREATE_FSR';
export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT';
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';

export const CONFIRM_ANNOUNCEMENT = 'CONFIRM_ANNOUNCEMENT';
export const CONFIRM_NOTIFICATION = 'CONFIRM_NOTIFICATION';

export const GET_USERS = 'GET_USERS';
export const GET_ANNOUNCEMENTS = 'GET_ANNOUNCEMENTS';
export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
// Action Types
export const TOGGLE_MODAL = 'DASHBOARD/TOGGLE_MODAL';
export const CHANGE_SELECTED_USER = 'DASHBOARD/CHANGE_SELECTED_USER';
export const TOGGLE_CONFIRM_ANNOUNCEMENT_MODAL =
  'DASHBOARD/TOGGLE_CONFIRM_ANNOUNCEMENT_MODAL';
export const TOGGLE_CONFIRM_NOTIFICATION_MODAL =
  'DASHBOARD/TOGGLE_CONFIRM_NOTIFICATION_MODAL';

export const toggleConfirmAnnouncementModal = () => ({
  type: TOGGLE_CONFIRM_ANNOUNCEMENT_MODAL,
});
export const toggleConfirmNotificationModal = () => ({
  type: TOGGLE_CONFIRM_NOTIFICATION_MODAL,
});
export const createAnnouncement = () => ({
  type: CREATE_ANNOUNCEMENT,
});
export const createNotification = () => ({
  type: CREATE_NOTIFICATION,
});

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

const initialState = {
  isSendNotificationModalOpen: false,

  isCreateNotificationModalOpen: false,
  isCreateAnnouncementModalOpen: false,

  isConfirmAnnouncementModalOpen: false,
  isConfirmNotificationModalOpen: false,
  createAnnouncement: false,
  createNotification: false,
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

        default:
          return state;
      }

    case GET_USERS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingUsers: true,
        }),
        success: prevState => ({
          ...prevState,
          users: payload.data.data,
          pagination: {
            page: payload.data.page,
            pages: payload.data.pages,
            limit: payload.data.limit,
            total: payload.data.total,
          },
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

    case CREATE_ANNOUNCEMENT:
      return {
        ...state,
        createAnnouncement: !createAnnouncement,
      };

    case CREATE_NOTIFICATION:
      return {
        ...state,
        createNotification: !createNotification,
      };

    case TOGGLE_CONFIRM_ANNOUNCEMENT_MODAL:
      return {
        ...state,
        isConfirmAnnouncementModalOpen: !state.isConfirmAnnouncementModalOpen,
      };

    case TOGGLE_CONFIRM_NOTIFICATION_MODAL:
      return {
        ...state,
        isConfirmNotificationModalOpen: !state.isConfirmNotificationModalOpen,
      };

    default:
      return state;
  }
};

export default reducer;
