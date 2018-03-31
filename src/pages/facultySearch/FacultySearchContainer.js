import { connect } from 'react-redux';
import FacultySearch from './FacultySearch';

import { searchUser } from './duck';

const mapStateToProps = state => {
  const { users } = state.search;

  return {
    users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchUser: query => {
      dispatch(searchUser(query));
    },
  };
};

const FacultySearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  FacultySearch,
);
export default FacultySearchContainer;
