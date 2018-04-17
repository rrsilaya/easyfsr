import React, { Component } from 'react';
import { List, Icon, Row, Col, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { DataLoader } from '../../global';
import Search from './components/Search';
import styles from './styles';

import { SEND_NOTIFICATION_FS } from './duck';
import SendNotificationFSModal from './components/SendNotificationFSModal';

const { Item: ListItem } = List;

class FacultySearch extends Component {
  componentWillUnmount() {
    this.props.resetPage();
  }

  handleToggleSendNotificationFSModal = () => {
    this.props.changeSelectedUser(this.props.user);
    this.props.toggleModal(SEND_NOTIFICATION_FS);
  };

  render() {
    const gridConfig = { xl: 8, sm: 12, xs: 24 };
    const {
      isSearching,
      isGettingUser,

      pushLink,
      addNotification,
      searchUser,
      changeSelectedUser,

      isSendNotificationFSModalOpen,
      toggleModal,

      user,
      users,
    } = this.props;

    return (
      <div>
        <Search searchUser={searchUser} />
        <DataLoader
          isLoading={isSearching}
          content={
            <List
              bordered
              size="large"
              style={styles.list}
              locale={{ emptyText: 'No users found' }}
              className="text white"
              dataSource={users}
              renderItem={item => (
                <ListItem
                  className="list-item set-cursor pointer"
                  style={styles.listItem}
                >
                  <Row type="flex" justify="space-around" style={styles.info}>
                    <Col {...gridConfig} className="text normal">
                      {item.firstName}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {item.middleName}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {item.lastName}
                    </Col>
                  </Row>
                  <div style={styles.icons}>
                    <Tooltip title="View FSR" arrowPointAtCenter>
                      <Icon className="text secondary" type="solution" />
                    </Tooltip>,
                    <Tooltip title="Send Notification" arrowPointAtCenter>
                      <SendNotificationFSModal
                        user={user}
                        isSendNotificationFSModalOpen={
                          isSendNotificationFSModalOpen
                        }
                        toggleModal={toggleModal}
                        handleAfterClose={this.handleAfterClose}
                        addNotification={addNotification}
                        changeSelectedUser={changeSelectedUser}
                      />
                      <Icon
                        className="text secondary"
                        type="message"
                        style={styles.message}
                        onClick={this.handleToggleSendNotificationFSModal}
                      />
                    </Tooltip>,
                    <Tooltip title="Profile" arrowPointAtCenter>
                      <Link to={`/profile/${item.employeeID}`}>
                        <Icon type="profile" className="text secondary" />
                      </Link>
                    </Tooltip>
                  </div>
                </ListItem>
              )}
            />
          }
        />
      </div>
    );
  }
}

export default FacultySearch;
