import { handle } from 'redux-pack';
import { notification } from 'antd';
import * as Api from '../api';

// Action Types
const TOGGLE_SIDEBAR = 'APP/TOGGLE_SIDEBAR';
const LOGIN = 'APP/LOGIN';
const GET_SESSION = 'APP/GET_SESSION';
const LOGOUT = 'APP/LOGOUT';
const TOGGLE_ACCOUNT_SETTINGS = 'APP/TOGGLE_ACCOUNT_SETTINGS';
const EDIT_SETTINGS = 'APP/EDIT_SETTINGS';
const UPDATE_ICON = 'APP/UPDATE_ICON';
// Action Creators
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const login = body => ({
  type: LOGIN,
  promise: Api.login(body),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Invalid credentials' });
    },
  },
});

export const getSession = () => ({
  type: GET_SESSION,
  promise: Api.getSession(),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Cannot connect to server' });
    },
  },
});

export const logout = () => ({
  type: LOGOUT,
  promise: Api.logout(),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Cannot connect to server' });
    },
  },
});
export const toggleAccountSettings = () => ({
  type: TOGGLE_ACCOUNT_SETTINGS,
});

export const editSettings = (user, body) => {
  const { userID } = user;
  return dispatch => {
    return dispatch({
      type: EDIT_SETTINGS,
      promise: Api.editUser(userID, body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Succesfully updated user.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while updating user.',
          });
        },
      },
    });
  };
};

export const updateProfileIcon = (user, form) => {
  const { userID } = user;
  return dispatch => {
    return dispatch({
      type: UPDATE_ICON,
      promise: Api.editUser(userID, form),
    });
  };
};

// Initial State
const initialState = {
  isSidebarCollapsed: false,
  isAccountSettingsToggled: false,
  isGettingSession: true,
  isLoggingIn: false,
  isEditingSettings: false,
  isUpdatingIcon: false,

  user: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      };

    case LOGIN:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoggingIn: true,
        }),
        success: prevState => ({
          ...prevState,
          user: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isLoggingIn: false,
        }),
      });

    case GET_SESSION:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingSession: true,
        }),
        success: prevState => ({
          ...prevState,
          isGettingSession: false,
          user: payload.data.data,
        }),
      });

    case LOGOUT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingSession: true,
        }),
        success: prevState => ({
          ...prevState,
          user: null,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingSession: false,
        }),
      });
    case TOGGLE_ACCOUNT_SETTINGS:
      return {
        ...state,
        isAccountSettingsToggled: !state.isAccountSettingsToggled,
      };
    case EDIT_SETTINGS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingSettings: true,
        }),
        success: prevState => ({
          ...prevState,
          isAccountSettingsToggled: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingSettings: false,
        }),
      });
    case UPDATE_ICON:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isUpdatingIcon: true,
        }),
        success: prevState => ({
          ...prevState,
          user: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isUpdatingIcon: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
