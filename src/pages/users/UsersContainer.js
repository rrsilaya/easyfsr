import { connect } from 'react-redux';
import Users from './Users';

import {
  toggleEditModal,
  toggleAddModal,
  toggleDeleteModal,
  addUser,
} from './duck';

const mapStateToProps = state => {
  const {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,

    isAddingUser,
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
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
