import { handle } from 'redux-pack';
import { notification } from 'antd';
import * as Api from '../../api';

// Action Types
const TOGGLE_EDIT_MODAL = 'USER/TOGGLE_EDIT_MODAL';
const TOGGLE_ADD_MODAL = 'USER/TOGGLE_ADD_MODAL';
const TOGGLE_DELETE_MODAL = 'USER/TOGGLE_DELETE_MODAL';
const CHANGE_SELECTED_USER = 'USER/CHANGE_SELECTED_USER';

const GET_USERS = 'USER/GET_USERS';
const ADD_USER = 'USER/ADD_USER';
const DELETE_USER = 'USER/DELETE_USER';
const EDIT_USER = 'USER/EDIT_USER';

const RESET_PAGE = 'USER/RESET_PAGE';

const CHANGE_QUERY = 'USER/CHANGE_QUERY';

export const toggleEditModal = () => ({
  type: TOGGLE_EDIT_MODAL,
});

export const toggleAddModal = () => ({
  type: TOGGLE_ADD_MODAL,
});

export const toggleDeleteModal = () => ({
  type: TOGGLE_DELETE_MODAL,
});

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

export const addUser = user => {
  return (dispatch, getState) => {
    const { query } = getState().users;

    return dispatch({
      type: ADD_USER,
      promise: Api.addUser(user),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully created user.',
          });
          dispatch(getUsers(query));
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

export const deleteUser = id => {
  return (dispatch, getState) => {
    const { user } = getState().users;

    return dispatch({
      type: DELETE_USER,
      promise: Api.deleteUser(user.userID),
      meta: {
        onSuccess: () => {
          notification.success({
            message: 'Successfully deleted user.',
          });
          dispatch(getUsers());
        },
        onFailure: () => {
          notification.error({
            message: 'Server error while deleting user.',
          });
        },
      },
    });
  };
};

export const editUser = (user, body) => {
  const { userID } = user;
  return dispatch => {
    return dispatch({
      type: EDIT_USER,
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

export const resetPage = () => ({
  type: RESET_PAGE,
});

export const changeQuery = query => ({
  type: CHANGE_QUERY,
  payload: query,
});

const initialState = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,
  isAdvancedSearchToggled: false,

  isGettingUsers: false,
  isAddingUser: false,
  isDeletingUser: false,
  isEditingUser: false,

  query: {},
  pagination: {
    page: 0,
    pages: 0,
    limit: 0,
    total: 0,
  },

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

    case CHANGE_SELECTED_USER:
      return {
        ...state,
        user: payload,
      };

    case ADD_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isAddingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          isAddModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isAddingUser: false,
        }),
      });

    case DELETE_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isDeletingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          users: state.users.filter(
            user => user.userID !== payload.data.data.userID,
          ),
          isDeleteModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isDeletingUser: false,
        }),
      });

    case EDIT_USER:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isEditingUser: true,
        }),
        success: prevState => ({
          ...prevState,
          users: prevState.users.map(
            user =>
              user.userID === payload.data.data.userID
                ? { ...payload.data.data }
                : user,
          ),
          isEditModalOpen: false,
        }),
        finish: prevState => ({
          ...prevState,
          isEditingUser: false,
        }),
      });

    case RESET_PAGE:
      return initialState;

    case CHANGE_QUERY:
      return {
        ...state,
        query: { ...state.query, ...payload },
      };

    default:
      return state;
  }
};

export default reducer;
