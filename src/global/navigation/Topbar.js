import React, { Component } from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import styles from './styles';

class Topbar extends Component {
  render() {
    const { toggleSidebar } = this.props;
    const { logout } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">
            {' '}
            <Icon type="setting" /> Account Settings
          </a>
        </Menu.Item>
        <Menu.Item>
          <div onClick={logout}>
            <Icon type="logout" /> Logout
          </div>
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
          <div>Sam Sepiol</div>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon type="caret-down" style={styles.caretDown} />
            </a>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}

export default Topbar;
