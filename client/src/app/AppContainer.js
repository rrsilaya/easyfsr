import { connect } from 'react-redux';
import App from './App';

import {
  toggleSidebar,
  getSession,
  login,
  logout,
  toggleAccountSettings,
  editSettings,
} from './duck';

const mapStateToProps = state => {
  const {
    isSidebarCollapsed,
    isAccountSettingsToggled,
    isGettingSession,
    isLoggingIn,
    user,
    isEditingSettings,
  } = state.app;

  return {
    isSidebarCollapsed,

    isGettingSession,
    isLoggingIn,
    isAccountSettingsToggled,
    user,
    isEditingSettings,
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
    toggleAccountSettings: () => {
      dispatch(toggleAccountSettings());
    },
    editSettings: (user, body) => {
      dispatch(editSettings(user, body));
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
