import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import logo from './easyFSR.svg';
import links from './links';
import styles from './styles';

const { Item } = Menu;

class Sidebar extends Component {
  getActiveTab = () => {
    const [, route] = window.location.pathname.split('/');

    switch (route) {
      case 'records':
        return 'Service Records';
      case 'profile':
        return 'Profile';
      case 'search':
        return 'Search';
      case 'users':
        return 'Users';
      case '':
        return 'Dashboard';
    }
  };

  render() {
    const { isSidebarCollapsed } = this.props;

    return (
      <Layout.Sider
        width={230}
        collapsible
        collapsed={isSidebarCollapsed}
        trigger={null}
      >
        <div style={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <Menu
          style={styles.sidebar}
          theme="dark"
          defaultSelectedKeys={[this.getActiveTab()]}
        >
          {links.map(link => (
            <Item key={link.label}>
              <Link to={link.path}>
                <Icon type={link.icon} />
                <span>{link.label}</span>
              </Link>
            </Item>
          ))}
        </Menu>
      </Layout.Sider>
    );
  }
}

export default Sidebar;
