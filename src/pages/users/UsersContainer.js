import { connect } from 'react-redux';
import Users from './Users';

import {
  toggleEditModal,
  toggleAddModal,
  toggleDeleteModal,
  changeSelectedUser,
  getUsers,
  addUser,
  editUser,
  resetPage,
  changeQuery,
} from './duck';

const mapStateToProps = state => {
  const {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,

    isGettingUsers,
    isAddingUser,
    isEditingUser,

    pagination,
    users,
    user,
  } = state.users;

  return {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,

    isGettingUsers,
    isAddingUser,
    isEditingUser,

    pagination,
    users,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEditModal: () => {
      dispatch(toggleEditModal());
    },
    toggleAddModal: () => {
      dispatch(toggleAddModal());
    },
    toggleDeleteModal: () => {
      dispatch(toggleDeleteModal());
    },
    changeSelectedUser: user => {
      dispatch(changeSelectedUser(user));
    },
    getUsers: query => {
      dispatch(getUsers(query));
    },
    addUser: values => {
      dispatch(addUser(values));
    },
    editUser: (user, values) => {
      dispatch(editUser(user, values));
    },
    resetPage: () => {
      dispatch(resetPage());
    },
    changeQuery: query => {
      dispatch(changeQuery(query));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
