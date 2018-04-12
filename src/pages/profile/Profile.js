import React, { Component, Fragment } from 'react';
import { Icon, Button, Modal } from 'antd';

import { PageLoader, Schedule } from '../../global';
import ProfileIcon from './components/ProfileIcon';
import ProfileInfo from './components/ProfileInfo';
import styles from './styles';

class Profile extends Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userID);
  }

  state = {
    loading: false,
    visible: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const { user, viewSchedule, isViewingSchedule, isGettingUser } = this.props;
    const { visible, loading } = this.state;

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
              <Button
                type="primary"
                size="large"
                onClick={this.showModal}
                style={{ margin: 30 }}
              >
                View Schedule
              </Button>
              <Modal
                title="Schedule"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={811 + 48}
                footer={[
                  <Button
                    key="download"
                    loading={loading}
                    onClick={this.handleOk}
                  >
                    Download
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={this.handleCancel}
                  >
                    Close
                  </Button>,
                ]}
              >
                <Schedule data={[]} />
              </Modal>
            </div>
            <ProfileInfo />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
