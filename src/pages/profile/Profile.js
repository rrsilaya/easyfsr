import React, { Component } from 'react';
import { Row, Col, Button, Avatar } from 'antd';
import userData from './UserContent';
import UserCard from './UserCard';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1> Profile </h1>

        <UserCard userData={userData} />
      </div>
    );
  }
}

export default Profile;
