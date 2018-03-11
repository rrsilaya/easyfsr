import React, { Component, Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { history } from './store';
import { Layout } from 'antd';

import { HeaderConfig, Sidebar, Topbar } from '../global';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <HeaderConfig title="easyFSR" />
        <ConnectedRouter history={history}>
          <Layout className="fullpage">
            <Sidebar />
            <Layout.Content className="dark-mode" style={{ overflowY: 'auto' }}>
              <Layout className="background primary content-body">
                <Topbar />
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
