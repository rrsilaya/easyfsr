import React, { Component } from 'react';
import { Icon } from 'antd';

import styles from './styles';

class Profile extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <div className="center">
          <img className="crop" src="#" alt={user.email} style={styles.photo} />
          <h1 className="center text white" style={styles.profileName}>
            {user.firstName} {user.middleName} {user.lastName}
          </h1>
          <div style={styles.info}>
            <div>
              <Icon type="user" style={styles.iconPad} />
              {user.employeeID}
            </div>
            <div>
              <Icon type="environment-o" style={styles.iconPad} />
              {user.officeNumber}
            </div>
            <div>
              <Icon type="idcard" style={styles.iconPad} />
              {user.contractType} Employee
            </div>
            <div>
              <Icon type="mail" style={styles.iconPad} />
              {user.emailAddress}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
