import { connect } from 'react-redux';
import Topbar from './Topbar';

import {
  toggleEditModal,
  toggleAddModal,
  toggleDeleteModal,
  changeSelectedUser,
  getUsers,
  addUser,
  deleteUser,
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

    query,
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

    query,
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
    deleteUser: id => {
      dispatch(deleteUser(id));
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

const TopbarContainer = connect(mapStateToProps, mapDispatchToProps)(Topbar);
export default TopbarContainer;
