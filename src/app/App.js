import React, { Component, Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';

import { HeaderConfig } from '../global';

class App extends Component {
  handleFoo = variable => {
    switch (variable) {
      case 1:
        console.log('hat');
        break;
    }
  };

  render() {
    return (
      <Fragment>
        <HeaderConfig title="FSR Management System" />
        <ConnectedRouter history={history}>
          <div>
            <h1>App</h1>
          </div>
        </ConnectedRouter>
      </Fragment>
    );
  }
}

export default App;
