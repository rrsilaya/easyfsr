import React, { Component } from 'react';
import { Button } from 'antd';

import UserList from './components/UserList';
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
        <UserList userData={userData} />
      </div>
    );
  }
}

export default Users;
