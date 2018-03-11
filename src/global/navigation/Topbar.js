import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import styles from './styles';

class Topbar extends Component {
  render() {
    return (
      <Layout.Header style={styles.topbar}>
        <Icon type="menu-fold" />
        <div style={styles.account}>
          <img style={styles.image} />
          <div>Sam Sepiol</div>
          <Icon type="caret-down" style={styles.caretDown} />
        </div>
      </Layout.Header>
    );
  }
}

export default Topbar;
