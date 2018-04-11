import { handle } from 'redux-pack';
import * as Api from '../../api';
import { notification } from 'antd';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const CREATE_FSR = 'CREATE_FSR';
export const DOWNLOAD_FSR = 'DOWNLOAD_FSR';
export const EDIT_FSR = 'EDIT_FSR';
export const VIEW_FSR = 'VIEW_FSR';
export const GET_USERS = 'GET_USERS';
// Action Types
export const TOGGLE_MODAL = 'DASHBOARD/TOGGLE_MODAL';
export const CHANGE_SELECTED_USER = 'DASHBOARD/CHANGE_SELECTED_USER';
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
  isDownloadFSRModalOpen: false,
  isEditFSRModalOpen: false,
  isViewFSRModalOpen: false,
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
        case DOWNLOAD_FSR:
          return {
            ...state,
            isDownloadFSRModalOpen: !state.isDownloadFSRModalOpen,
          };
        case EDIT_FSR:
          return {
            ...state,
            isEditFSRModalOpen: !state.isEditFSRModalOpen,
          };
        case VIEW_FSR:
          return {
            ...state,
            isViewFSRModalOpen: !state.isViewFSRModalOpen,
          };
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
        default:
          return state;
      }

    default:
      return state;
  }
};

export default reducer;
