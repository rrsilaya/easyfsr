import { handle } from 'redux-pack';
import { notification } from 'antd';
import * as Api from '../../api';

// Action Types
const GET_FSR = 'SERVICE_RECORDS/GET_FSR';
const GET_NOTIFICATONS = 'SERVICE_RECORDS/GET_NOTIFICATONS';
const GET_ANNOUNCEMENTS = 'SERVICE_RECORDS/GET_ANNOUNCEMENTS';

// Action Creators
export const getFSRs = () => ({
  type: GET_FSR,
  promise: Api.getFSRs(),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Failure to fetch service records' });
    },
  },
});

export const getNotifications = () => ({
  type: GET_NOTIFICATONS,
  promise: Api.getNotifications(),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Failure to fetch notifications' });
    },
  },
});

export const getAnnouncements = () => ({
  type: GET_ANNOUNCEMENTS,
  promise: Api.getAnnouncements(),
  meta: {
    onFailure: () => {
      notification.error({ message: 'Failure to fetch announcements' });
    },
  },
});

// Initial State
const initialState = {
  fsr: [],
  notifications: [],
  announcements: [],

  isGettingFSR: true,
  isGettingAnnouncements: true,
  isGettingNotifications: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FSR:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isGettingFSR: true,
        }),
        success: prevState => ({
          ...prevState,
          fsr: payload.data.data,
        }),
        finish: prevState => ({
          ...prevState,
          isGettingFSR: false,
        }),
      });
    case GET_NOTIFICATONS:
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

    default:
      return state;
  }
};

export default reducer;
