import { connect } from 'react-redux';
import Users from './Users';

import {
  toggleEditModal,
  toggleAddModal,
  toggleDeleteModal,
  getUsers,
  getUser,
  addUser,
  deleteUser,
  editUser,
} from './duck';

const mapStateToProps = state => {
  const {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,

    isGettingUsers,
    isAddingUser,
    isDeletingUser,
    isEditingUser,

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
    getUsers: () => {
      dispatch(getUsers());
    },
    getUser: user => {
      dispatch(getUser(user));
    },
    addUser: values => {
      dispatch(addUser(values));
    },
    deleteUser: id => {
      dispatch(deleteUser(id));
    },
    editUser: (userID, body) => {
      dispatch(editUser(userID, body));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
