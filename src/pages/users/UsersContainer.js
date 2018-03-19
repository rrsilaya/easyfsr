import { connect } from 'react-redux';
import Users from './Users';

import {
  toggleEditModal,
  toggleAddModal,
  toggleDeleteModal,
  addUser,
  deleteUser,
} from './duck';

const mapStateToProps = state => {
  const {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,

    isAddingUser,
    isDeletingUser,
  } = state.users;

  return {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,

    isAddingUser,
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
    addUser: values => {
      dispatch(addUser(values));
    },
    deleteUser: id => {
      dispatch(deleteUser(id));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
