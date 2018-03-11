import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import links from './links';
import styles from './styles';

const { Item } = Menu;

class Sidebar extends Component {
  render() {
    return (
      <Layout.Sider width={230} collapsible trigger={null}>
        <div style={styles.logo}>&nbsp;</div>
        <Menu style={styles.sidebar} theme="dark">
          {links.map(link => (
            <Item key={link.label}>
              <Icon type={link.icon} />
              <span>{link.label}</span>
            </Item>
          ))}
        </Menu>
      </Layout.Sider>
    );
  }
}

export default Sidebar;
