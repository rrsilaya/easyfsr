import { connect } from 'react-redux';
import App from './App';

import { toggleSidebar } from './duck';

const mapStateToProps = state => {
  const { isSidebarCollapsed } = state.app;

  return {
    isSidebarCollapsed,
    user: true,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
