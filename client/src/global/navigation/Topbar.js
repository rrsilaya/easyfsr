import React, { Component } from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import styles from './styles';
import AccountSettingsModal from './AccountSettingsModal';

class Topbar extends Component {
  handleToggleEditModal = () => {
    this.props.toggleEditModal();
  };
  render() {
    const {
      // State
      user,
      isAccountSettingsToggled,
      isEditingSettings,

      // Dispatch
      toggleSidebar,
      logout,
      editSettings,

      toggleAccountSettings,
    } = this.props;

    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={toggleAccountSettings}>
            <Icon type="setting" style={styles.iconOffset} />
            Account Settings
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={logout}>
            <Icon type="logout" style={styles.iconOffset} />
            Logout
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Layout.Header style={styles.topbar}>
          <Icon
            type="menu-fold"
            onClick={toggleSidebar}
            className="set-cursor pointer"
          />

          <div style={styles.account}>
            <img style={styles.image} src={user.profileIcon} alt="" />
            <Dropdown overlay={menu} trigger={['click']}>
              <div className="set-cursor pointer">
                <span>{`${user.firstName} ${user.lastName}`}</span>
                <Icon type="caret-down" style={styles.caretDown} />
              </div>
            </Dropdown>
          </div>
        </Layout.Header>
        <AccountSettingsModal
          isAccountSettingsToggled={isAccountSettingsToggled}
          user={user}
          toggleAccountSettings={toggleAccountSettings}
          editSettings={editSettings}
          isEditingSettings={isEditingSettings}
        />
      </div>
    );
  }
}

export default Topbar;
