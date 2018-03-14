import React, { Component, Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { history } from './store';
import { Layout } from 'antd';

import { HeaderConfig, Sidebar, Topbar, Loader } from '../global';
import routes from './routes';
import Login from '../pages/login/Login';

class App extends Component {
  render() {
    const {
      // State
      isSidebarCollapsed,
      user,
      isLoading,

      // Dispatch
      toggleSidebar,
    } = this.props;

    return (
      <Fragment>
        <HeaderConfig title="easyFSR" />
        <ConnectedRouter history={history}>
          {isLoading ? (
            <Loader />
          ) : user ? (
            <Layout className="fullpage">
              <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
              <Layout.Content
                className="dark-mode"
                style={{ overflowY: 'auto' }}
              >
                <Layout className="background primary content-body">
                  <Topbar toggleSidebar={toggleSidebar} />
                  <Layout.Content style={{ paddingBottom: '2em' }}>
                    <Switch>
                      {routes.map(route => (
                        <Route key={route.path} {...route} />
                      ))}
                      <Redirect to="/" />
                    </Switch>
                  </Layout.Content>
                </Layout>
              </Layout.Content>
            </Layout>
          ) : (
            <Switch>
              <Route exact path="/" component={Login} />
              <Redirect to="/" />
            </Switch>
          )}
        </ConnectedRouter>
      </Fragment>
    );
  }
}

export default App;
