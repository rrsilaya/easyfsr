import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import User from './User';

import styles from './styles';
import userData from './user-data';

class Users extends Component {
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div style={styles.button}>
          <Button size="large" icon="plus-circle-o">
            Add User
          </Button>
        </div>
        <Row gutter={16}>
          {userData.map(user => (
            <Col span={6}>
              <User title={user.name} description={user.type} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Users;
