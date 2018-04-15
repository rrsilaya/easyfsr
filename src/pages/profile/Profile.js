import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';

import { PageLoader, Schedule } from '../../global';
import ProfileIcon from './components/ProfileIcon';
import ProfileInfo from './components/ProfileInfo';
import styles from './styles';

class Profile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userID);

    this.props.getAdminWork(this.props.match.params.userID);
    this.props.getUserExtensionAndCommService(this.props.match.params.userID);
  }

  render() {
    const {
      user,
      adminWork,
      service,

      isGettingUser,
      isUploadingIcon,

      uploadIcon,
    } = this.props;

    return (
      <div>
        {isGettingUser ? (
          <PageLoader />
        ) : (
          <Fragment>
            <div className="center">
              <ProfileIcon
                user={user}
                isUploadingIcon={isUploadingIcon}
                uploadIcon={uploadIcon}
              />
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
            <ProfileInfo
              userID={this.props.match.params.employeeID}
              adminWork={adminWork}
              service={service}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
