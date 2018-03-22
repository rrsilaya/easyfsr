import React, { Component } from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import styles from './styles';

class Topbar extends Component {
  render() {
    const {
      // State
      user,

      // Dispatch
      toggleSidebar,
      logout,
    } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <Icon type="setting" style={styles.iconOffset} />
          Account Settings
        </Menu.Item>
        <Menu.Item>
          <span onClick={logout}>
            <Icon type="logout" style={styles.iconOffset} />
            Logout
          </span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header style={styles.topbar}>
        <Icon
          type="menu-fold"
          onClick={toggleSidebar}
          className="set-cursor pointer"
        />

        <div style={styles.account}>
          <img style={styles.image} alt="" />
          <Dropdown overlay={menu} trigger={['click']}>
            <div className="set-cursor pointer">
              <span>{`${user.firstName} ${user.lastName}`}</span>
              <Icon type="caret-down" style={styles.caretDown} />
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}

export default Topbar;
