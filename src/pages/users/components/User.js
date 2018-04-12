import React, { Component } from 'react';
import { Card, Icon, Avatar, Modal, Tooltip } from 'antd';
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
            <Tooltip title="Edit user" arrowPointAtCenter>
              <Icon
                type="edit"
                className="text normal"
                onClick={this.handleToggleEditModal}
              />
            </Tooltip>,
            <Tooltip title="Archive user" arrowPointAtCenter>
              <Icon
                type="delete"
                className="text normal"
                onClick={this.showDeleteConfirm}
              />
            </Tooltip>,
            <Link to={`/profile/${user.employeeID}`}>
              <Tooltip title="Visit profile" arrowPointAtCenter>
                <Icon type="profile" className="text normal" />
              </Tooltip>
            </Link>,
          ]}
        >
          <Meta
            avatar={<Avatar size="large" src={user.profileIcon} />}
            title={this.props.title}
            description={this.props.description}
          />
        </Card>
      </div>
    );
  }
}

export default User;
