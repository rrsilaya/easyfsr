import React, { Component } from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import styles from './styles';
import { connect } from 'react-redux';
import App from '../../app/App';
import { toggleSidebar, getSession, login } from '../../app/duck';

class Topbar extends Component {
  handleClick() {
    const mapStateToProps = state => {
      const {
        isSidebarCollapsed = false,

        isGettingSession = false,
        isLoggingIn = false,

        user = {},
      } = state.app;

      return {
        isSidebarCollapsed,

        isGettingSession,
        isLoggingIn,

        user,
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        toggleSidebar: () => {
          dispatch(toggleSidebar());
        },
        getSession: () => {
          dispatch(getSession());
        },
        login: body => {
          dispatch(login(body));
        },
      };
    };
    const Topbar = connect(mapStateToProps, mapDispatchToProps)(App);
  }
  render() {
    const { toggleSidebar } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">
            {' '}
            <Icon type="setting" /> Account Settings
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" onclick={this.handleClick.bind(this)}>
            <Icon type="logout" /> Logout
          </a>
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
