import { connect } from 'react-redux';
import FacultySearch from './FacultySearch';
import { push } from 'react-router-redux';

import {
  searchUser,
  resetPage,
  toggleModal,
  addNotification,
  changeSelectedUser,
} from './duck';

const mapStateToProps = state => {
  const {
    isSearching,
    isSendNotificationFSModalOpen,
    users,
    user,
  } = state.search;

  return {
    isSearching,
    isSendNotificationFSModalOpen,
    users,
    user,
    // searchedUsers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPage: () => {
      dispatch(resetPage());
    },
    pushLink: route => {
      dispatch(push(route));
    },
    toggleModal: modal => {
      dispatch(toggleModal(modal));
    },
    searchUser: query => {
      dispatch(searchUser(query));
    },
    addNotification: values => {
      dispatch(addNotification(values));
    },
    changeSelectedUser: user => {
      dispatch(changeSelectedUser(user));
    },
  };
};

const FacultySearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  FacultySearch,
);
export default FacultySearchContainer;
