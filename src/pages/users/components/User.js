import React, { Component } from 'react';
import { Card, Icon, Avatar, Modal } from 'antd';
import { Link } from 'react-router-dom';

import styles from '../styles';

const { Meta } = Card;
const { confirm } = Modal;

class User extends Component {
  handleToggleDeleteModal = () => {
    this.props.changeSelectedUser(this.props.user);
    this.props.toggleDeleteModal();
  };
  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'You are about to archive this user.',
      okText: 'Yes',
      cancelText: 'No',
      okType: 'primary',
      onOk: () => {
        this.handleToggleDeleteModal();
      },
      onCancel: () => {},
    });
  };
  handleToggleEditModal = () => {
    this.props.changeSelectedUser(this.props.user);
    this.props.toggleEditModal();
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <Card
          bordered={false}
          style={styles.card}
          actions={[
            <Icon
              type="edit"
              className="text normal"
              onClick={this.handleToggleEditModal}
            />,
            <Icon
              type="delete"
              className="text normal"
              onClick={this.showDeleteConfirm}
            />,
            <Link to={`/profile/${user.employeeID}`}>
              <Icon type="profile" className="text normal" />
            </Link>,
          ]}
        >
          <Meta
            avatar={<Avatar size="large" icon="user" />}
            title={this.props.title}
            description={this.props.description}
          />
        </Card>
      </div>
    );
  }
}

export default User;
