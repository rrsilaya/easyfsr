import { connect } from 'react-redux';
import Users from './Users';

import { toggleEditModal, toggleAddModal, toggleDeleteModal } from './duck';

const mapStateToProps = state => {
  const { isEditModalOpen, isAddModalOpen, isDeleteModalOpen } = state.users;

  return {
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,
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
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
