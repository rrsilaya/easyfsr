import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';

import { PageLoader } from '../../global';
import ProfileIcon from './components/ProfileIcon';
import ProfileInfo from './components/ProfileInfo';
import styles from './styles';

class Profile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userID);
  }

  render() {
    const {
      user,

      isGettingUser,
    } = this.props;

    return (
      <div>
        {isGettingUser ? (
          <PageLoader />
        ) : (
          <Fragment>
            <div className="center">
              <ProfileIcon />
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
            <ProfileInfo />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
