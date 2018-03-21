import { connect } from 'react-redux';
import Users from './Users';

import {
  toggleEditModal,
  toggleAddModal,
  toggleDeleteModal,
  getUsers,
  getUser,
  addUser,
  editUser,
} from './duck';

const mapStateToProps = state => {
  const {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,

    isGettingUsers,
    isAddingUser,
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
    editUser: (user, body) => {
      dispatch(editUser(user, body));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
