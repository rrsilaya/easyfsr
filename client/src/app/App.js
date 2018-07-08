import React, { Component, Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { history } from './store';
import { Layout } from 'antd';

import { HeaderConfig, Sidebar, Topbar, Loader } from '../global';
import routes from './routes';
import Login from '../pages/login/Login';

class App extends Component {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const {
      // State
      isSidebarCollapsed,
      user,
      isGettingSession,
      isLoggingIn,
      isAccountSettingsToggled,
      isEditingSettings,

      // Dispatch
      toggleSidebar,
      login,
      logout,
      toggleAccountSettings,
      editSettings,
    } = this.props;

    return (
      <Fragment>
        <HeaderConfig title="easyFSR" />
        <ConnectedRouter history={history}>
          {isGettingSession ? (
            <Loader />
          ) : user ? (
            <Layout className="fullpage">
              <Sidebar isSidebarCollapsed={isSidebarCollapsed} user={user} />
              <Layout.Content
                className="dark-mode"
                style={{ overflowY: 'auto' }}
              >
                <Layout className="background primary content-body">
                  <Topbar
                    toggleSidebar={toggleSidebar}
                    logout={logout}
                    user={user}
                    toggleAccountSettings={toggleAccountSettings}
                    isAccountSettingsToggled={isAccountSettingsToggled}
                    isEditingSettings={isEditingSettings}
                    editSettings={editSettings}
                  />
                  <Layout.Content style={{ paddingBottom: '2em' }}>
                    <Switch>
                      {routes.map(
                        route =>
                          route.type === 'route' ? (
                            !route.restricted ? (
                              <Route key={route.path} {...route} />
                            ) : user.acctType === 'ADMIN' ? (
                              <Route key={route.path} {...route} />
                            ) : (
                              ''
                            )
                          ) : (
                            <Redirect key={route.to} {...route} />
                          ),
                      )}
                      <Redirect
                        from="/profile"
                        to={`/profile/${user.employeeID}`}
                      />
                      <Redirect to="/" />
                    </Switch>
                  </Layout.Content>
                </Layout>
              </Layout.Content>
            </Layout>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Login isLoggingIn={isLoggingIn} login={login} />
                )}
              />
              <Redirect to="/" />
            </Switch>
          )}
        </ConnectedRouter>
      </Fragment>
    );
  }
}

export default App;
