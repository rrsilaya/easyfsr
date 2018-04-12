import React, { Component, Fragment } from 'react';
import { Icon, Button } from 'antd';
import { PageLoader, Schedule } from '../../global';

import ProfileIcon from './components/ProfileIcon';
import ProfileInfo from './components/ProfileInfo';
import EditModal from './components/EditModal';

import styles from './styles';

class Profile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userID);
  }

  render() {
    const {
      user,
      isEditModalOpen,
      isEditingUser,
      toggleEditModal,
      editUser,

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
            <div className="center">
              <Button
                style={styles.editButton}
                size="medium"
                icon="edit"
                ghost
                onClick={toggleEditModal}
              >
                Edit Profile
              </Button>
            </div>
          </Fragment>
        )}
        <EditModal
          user={user}
          isEditModalOpen={isEditModalOpen}
          toggleEditModal={toggleEditModal}
          editUser={editUser}
          isEditingUser={isEditingUser}
        />
      </div>
    );
  }
}

export default Profile;
