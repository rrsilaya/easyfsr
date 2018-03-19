import { handle } from 'redux-pack';
import { notification } from 'antd';
import * as Api from '../../api';

// Action Types
const TOGGLE_EDIT_MODAL = 'USER/TOGGLE_EDIT_MODAL';
const TOGGLE_ADD_MODAL = 'USER/TOGGLE_ADD_MODAL';
const TOGGLE_DELETE_MODAL = 'USER/TOGGLE_DELETE_MODAL';

const ADD_USER = 'USER/ADD_USER';

export const toggleEditModal = () => ({
  type: TOGGLE_EDIT_MODAL,
});

export const toggleAddModal = () => ({
  type: TOGGLE_ADD_MODAL,
});

export const toggleDeleteModal = () => ({
  type: TOGGLE_DELETE_MODAL,
});

export const addUser = user => {
  return dispatch => {
    return dispatch({
      type: ADD_USER,
      promise: Api.addUser(user),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully created user.',
          });
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while creating user.',
          });
        },
      },
    });
  };
};

const initialState = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,

  isAddingUser: false,

  users: [],
  user: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
      };

    case TOGGLE_ADD_MODAL:
      return {
        ...state,
        isAddModalOpen: !state.isAddModalOpen,
      };

    case TOGGLE_DELETE_MODAL:
      return {
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen,
      };

    case ADD_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          users: [...state.users, payload.data.data],
          isAddModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingUser: false,
        }),
      });

    default:
      return state;
  }
};

export default reducer;
