import React, { Component, Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import { Layout } from 'antd';

import { HeaderConfig, Sidebar } from '../global';

class App extends Component {
  render() {
    return (
      <Fragment>
        <HeaderConfig title="easyFSR" />
        <ConnectedRouter history={history}>
          <Layout className="fullpage">
            <Sidebar />
            <Layout.Content className="dark-mode" style={{ overflowY: 'auto' }}>
              <h1>App</h1>
            </Layout.Content>
          </Layout>
        </ConnectedRouter>
      </Fragment>
    );
  }
}

export default App;
