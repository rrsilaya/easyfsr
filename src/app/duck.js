import { handle } from 'redux-pack';
import { notification } from 'antd';
import * as Api from '../api';

// Action Types
const TOGGLE_SIDEBAR = 'APP/TOGGLE_SIDEBAR';
const LOGIN = 'APP/LOGIN';
const GET_SESSION = 'APP/GET_SESSION';

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
});

// Initial State
const initialState = {
  isSidebarCollapsed: false,

  isGettingSession: true,
  isLoggingIn: false,

  user: {},
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

    default:
      return state;
  }
};

export default reducer;
