import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import styles from '../styles';

const { Meta } = Card;

class User extends Component {
  render() {
    const {
      changeSelectedUser,
      toggleDeleteModal,
      toggleEditModal,
      user,
    } = this.props;

    const handleToggleEditModal = () => {
      changeSelectedUser(user);
      toggleEditModal();
    };

    return (
      <div>
        <Card
          bordered={false}
          style={styles.card}
          actions={[
            <Icon
              type="edit"
              className="text normal"
              onClick={handleToggleEditModal}
            />,
            <Icon
              type="delete"
              className="text normal"
              onClick={toggleDeleteModal}
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
