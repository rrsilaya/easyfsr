import { handle } from 'redux-pack';
import { notification } from 'antd';
import { push } from 'react-router-redux';
import * as Api from '../../api';

// Action Types
const GET_USER = 'PROFILE/GET_USER';
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
  isUploadingIcon: false,

  user: {},
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
