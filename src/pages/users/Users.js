import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import User from './User';
import UserList from './UserList';
import styles from './styles';
import userData from './user-data';

class Users extends Component {
  render() {
    return (
      <div>
        <div style={styles.button}>
          <Button size="large" icon="plus-circle-o" ghost>
            Add User
          </Button>
        </div>
        <UserList expanded userData={userData} />
      </div>
    );
  }
}

export default Users;
