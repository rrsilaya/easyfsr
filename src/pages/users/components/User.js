import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';

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
            <Icon type="profile" className="text normal" />,
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
