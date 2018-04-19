import { handle } from 'redux-pack';
import * as Api from '../../api';
import { notification } from 'antd';

// Action Types
const SEARCH_USER = 'FACULTY/SEARCH_USER';
const RESET_PAGE = 'FACULTY/RESET_PAGE';
export const GET_USER = 'FACULTYSEARCH/GET_USERS';
export const ADD_NOTIFICATION = 'FACULTY/ADD_NOTIFICATION';
export const TOGGLE_MODAL = 'FACULTYSEARCH/TOGGLE_MODAL';
export const SEND_NOTIFICATION_FS = 'FACULTYSEARCH/SEND_NOTIFICATION_FS';
export const GET_USERS = 'FACULTYSEARCH/GET_USERS';
// Action Creators
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

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal,
});

export const searchUser = query => ({
  type: SEARCH_USER,
  promise: Api.getUsers(query),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Error searching faculty staff' });
    },
  },
});

export const resetPage = () => ({
  type: RESET_PAGE,
});

// Initial State
const initialState = {
  isSendNotificationFSModalOpen: false,
  isSearching: false,
  isSearchingUsers: false,
  isGettingUser: false,
  searchedUsers: [],
  users: [],
  user: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
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
          isSearching: true,
        }),
        success: prevState => ({
          ...prevState,
          users: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isSearching: false,
        }),
      });
    case TOGGLE_MODAL:
      switch (payload) {
        case SEND_NOTIFICATION_FS:
          return {
            ...state,
            isSendNotificationFSModalOpen: !state.isSendNotificationFSModalOpen,
          };

        default:
          return state;
      }

    case RESET_PAGE:
      return initialState;

    case GET_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          users: prevState.users.map(
            user =>
              user.userID === payload.data.data.userID
                ? { ...payload.data.data }
                : user,
          ),
          isSendNotificationFSModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingUser: false,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
