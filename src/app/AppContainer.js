import { connect } from 'react-redux';
import App from './App';

import { toggleSidebar, getSession, login, logout } from './duck';

const mapStateToProps = state => {
  const {
    isSidebarCollapsed,

    isGettingSession,
    isLoggingIn,

    user,
  } = state.app;

  return {
    isSidebarCollapsed,

    isGettingSession,
    isLoggingIn,

    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    },
    getSession: () => {
      dispatch(getSession());
    },
    login: body => {
      dispatch(login(body));
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
