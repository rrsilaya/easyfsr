import { handle } from 'redux-pack';
import { notification } from 'antd';
import { push } from 'react-router-redux';
import * as Api from '../../api';

// Action Types
const GET_USER = 'PROFILE/GET_USER';

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

// Initial State
const initialState = {
  isGettingUser: true,
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

    default:
      return state;
  }
};

export default reducer;
