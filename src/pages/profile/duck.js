import { handle } from 'redux-pack';
import { notification } from 'antd';
import { push } from 'react-router-redux';
import * as Api from '../../api';

// Action Types
const GET_USER = 'PROFILE/GET_USER';
const TOGGLE_EDIT_MODAL = 'PROFILE/TOGGLE_EDIT_MODAL';
const EDIT_USER = 'PROFILE/EDIT_USER';

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

export const toggleEditModal = () => ({
  type: TOGGLE_EDIT_MODAL,
});

export const editUser = (user, body) => {
  const { userID } = user;
  return dispatch => {
    return dispatch({
      type: EDIT_USER,
      promise: Api.editUser(userID, body),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Succesfully updated profile.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while updating profile.',
          });
        },
      },
    });
  };
};

// Initial State
const initialState = {
  isGettingUser: true,
  user: {},
  isEditModalOpen: false,
  isEditingProfile: false,
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

    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
      };

    case EDIT_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingProfile: true,
        }),
        success: prevState => ({
          ...prevState,
          isEditModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingProfile: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
