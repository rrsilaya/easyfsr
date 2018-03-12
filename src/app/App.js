import React, { Component, Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { history } from './store';
import { Layout } from 'antd';

import { HeaderConfig, Sidebar, Topbar } from '../global';
import routes from './routes';

class App extends Component {
  render() {
    const {
      // State
      isSidebarCollapsed,

      // Dispatch
      toggleSidebar,
    } = this.props;

    return (
      <Fragment>
        <HeaderConfig title="easyFSR" />
        <ConnectedRouter history={history}>
          <Layout className="fullpage">
            <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
            <Layout.Content className="dark-mode" style={{ overflowY: 'auto' }}>
              <Layout className="background primary content-body">
                <Topbar toggleSidebar={toggleSidebar} />
                <Layout.Content>
                  <Switch>
                    {routes.map(
                      route =>
                        route.type === 'path' ? (
                          <Route key={route.path} {...route} />
                        ) : (
                          <Redirect key={route.to} {...route} />
                        ),
                    )}
                  </Switch>
                </Layout.Content>
              </Layout>
            </Layout.Content>
          </Layout>
        </ConnectedRouter>
      </Fragment>
    );
  }
}

export default App;
