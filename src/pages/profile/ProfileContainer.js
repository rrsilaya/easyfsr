import { connect } from 'react-redux';
import Profile from './Profile';

const mapStateToProps = state => {
  const { user } = state.app;

  return {
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
