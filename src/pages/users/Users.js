import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import User from './components/User';
import styles from './styles';
import userData from './user-data';

class Users extends Component {
  render() {
    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };

    return (
      <div>
        <div style={styles.button}>
          <Button size="large" icon="plus-circle-o" ghost>
            Add User
          </Button>
        </div>
        <Row type="flex" gutter={16}>
          {userData.map((user, i) => (
            <Col key={i} {...gridConfig}>
              <User
                title={`${user.lastName}, ${user.firstName}`}
                description={user.type}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Users;
