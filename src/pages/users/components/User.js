import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import styles from '../styles';

const { Meta } = Card;

class User extends Component {
  handleToggleEditModal = () => {
    this.props.changeSelectedUser(this.props.user);
    this.props.toggleEditModal();
  };
  handleToggleDeleteModal = () => {
    this.props.changeSelectedUser(this.props.user);
    this.props.toggleDeleteModal();
  };
  render() {
    const {
      changeSelectedUser,
      toggleDeleteModal,
      toggleEditModal,
      user,
    } = this.props;

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
              onClick={this.handleToggleDeleteModal}
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
