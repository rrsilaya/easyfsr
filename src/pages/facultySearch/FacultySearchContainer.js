import { connect } from 'react-redux';
import FacultySearch from './FacultySearch';
import { push } from 'react-router-redux';
import { searchUser, resetPage } from './duck';

const mapStateToProps = state => {
  const { users, isSearching } = state.search;

  return {
    users,
    isSearching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchUser: query => {
      dispatch(searchUser(query));
    },
    resetPage: () => {
      dispatch(resetPage());
    },
    pushLink: route => {
      dispatch(push(route));
    },
  };
};

const FacultySearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  FacultySearch,
);
export default FacultySearchContainer;
