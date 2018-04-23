import React, { Component, Fragment } from 'react';
import { Icon, Button } from 'antd';

import { PageLoader, DataLoader } from '../../global';
import Schedule from './components/Schedule';
import ProfileIcon from './components/ProfileIcon';
import ProfileInfo from './components/ProfileInfo';

import { SCHEDULE_MODAL } from './duck';
import styles from './styles';

class Profile extends Component {
  componentDidMount() {
    const { userID } = this.props.match.params;

    this.props.getUserProfile(userID);
    this.props.getAdminWork(userID);
    this.props.getUserExtensionAndCommService(userID);
    this.props.getUserCreativeWorks(userID);
    this.props.getUserLimitedPractices(userID);
    this.props.getUserStudyLoads(userID);
    this.props.getUserAwards(userID);
    this.props.getUserResearches(userID);
  }

  componentWillUnmount() {
    this.props.resetPage();
  }

  toggleScheduleModal = () => {
    this.props.toggleModal(SCHEDULE_MODAL);
  };

  render() {
    const {
      user,
      adminWork,
      service,
      schedule,
      creativeWork,
      limitedPractice,
      studyLoad,
      award,
      research,
      fsr,

      isGettingUser,
      isUploadingIcon,
      isLoadingCards,
      isGettingSchedule,
      isSchedModalOpen,

      uploadIcon,
      getUserSchedule,
    } = this.props;

    return (
      <div>
        {isGettingUser ? (
          <PageLoader />
        ) : (
          <Fragment>
            <Schedule
              isSchedModalOpen={isSchedModalOpen}
              toggleScheduleModal={this.toggleScheduleModal}
              getUserSchedule={getUserSchedule}
              employeeID={user.employeeID}
              isGettingSchedule={isGettingSchedule}
              schedule={schedule}
            />
            <div className="center" style={styles.header}>
              <ProfileIcon
                user={user}
                isUploadingIcon={isUploadingIcon}
                uploadIcon={uploadIcon}
                showUploadIcon={
                  this.props.user.employeeID ===
                  this.props.userLoggedIn.employeeID
                    ? true
                    : false
                }
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
              <div style={styles.actions}>
                <Button ghost onClick={this.toggleScheduleModal}>
                  View Schedule
                  <Icon type="right" />
                </Button>
              </div>
            </div>
            {Object.keys(isLoadingCards)
              .map(key => isLoadingCards[key])
              .every(e => e) ? (
              <DataLoader isLoading opaque />
            ) : (
              <ProfileInfo
                adminWork={adminWork}
                service={service}
                creativeWork={creativeWork}
                limitedPractice={limitedPractice}
                studyLoad={studyLoad}
                award={award}
                research={research}
                fsr={fsr}
                isLoadingCards={isLoadingCards}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
