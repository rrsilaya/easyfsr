import React, { Component } from 'react';
import { Row, Col, Button, Avatar } from 'antd';
//
// import style from './styles';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <Row justify="start" type="flex" order={1} gutter={8}>
            <Col span={8} gutter={4}>
              <Avatar icon="user" />
              <Button
                ghost
                size="small"
                style={{ marginLeft: 16, verticalAlign: 'middle' }}
              >
                Edit
              </Button>

              <Button
                ghost
                size="small"
                style={{ marginLeft: 16, verticalAlign: 'middle' }}
              >
                Send Notification
              </Button>
            </Col>
          </Row>
          <Row justify="start" type="flex">
            <h2> User Name </h2>
          </Row>
        </div>
      </div>
    );
  }
}

export default Profile;
