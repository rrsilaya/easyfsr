import { handle } from 'redux-pack';
import { notification } from 'antd';
import { push } from 'react-router-redux';
import * as Api from '../../api';
import { updateProfileIcon } from '../../app/duck';

// Action Types
const GET_USER = 'PROFILE/GET_USER';
const GET_ADMIN_WORK = 'PROFILE/GET_ADMIN_WORK';
const GET_EXT_AND_COMM_SERVICE = 'PROFILE/GET_EXT_AND_COMM_SERVICE';
const UPLOAD_ICON = 'PROFILE/UPLOAD_ICON';

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

// Initial State
const initialState = {
  isGettingUser: true,
  isGettingAdminWork: true,
  isGettingExtAndCommService: true,
  isUploadingIcon: false,

  user: {},
  adminWork: [],
  service: [],
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
          isGettingAdminWork: false,
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
          isGettingAdmingWork: false,
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

    default:
      return state;
  }
};

export default reducer;
