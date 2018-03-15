import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import logo from './easyFSR.png';
import links from './links';
import styles from './styles';

const { Item } = Menu;

class Sidebar extends Component {
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
          <img src={logo} />
        </div>
        <Menu style={styles.sidebar} theme="dark">
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
