import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import styles from './styles';
import { Input } from 'antd';
const Search = Input.Search;

class Topbar extends Component {
  render() {
    const { toggleSidebar } = this.props;

    return (
      <Layout.Header style={styles.topbar}>
        <Icon
          type="menu-fold"
          onClick={toggleSidebar}
          className="set-cursor pointer"
        />

        <div style={styles.account}>
          <Search
            placeholder="input faculty name"
            onSearch={value => console.log(value)}
            style={{ width: 300, right: 20 }}
            enterButton
          />
          <img style={styles.image} alt="" />
          <div>Sam Sepiol</div>
          <Icon type="caret-down" style={styles.caretDown} />
        </div>
      </Layout.Header>
    );
  }
}

export default Topbar;
