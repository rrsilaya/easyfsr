import React, { Component } from 'react';

import userData from './UserContent';
import UserCard from './UserCard';

class Profile extends Component {
  render() {
    return (
      <div>
        <UserCard userData={userData} />
      </div>
    );
  }
}

export default Profile;
