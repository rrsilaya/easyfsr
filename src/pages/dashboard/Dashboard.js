import React, { Component } from 'react';
import { Icon, Card, Table, Row, Col, Button, List } from 'antd';
import styles from './styles';
import columns from './columns';
import moment from 'moment';

import SendNotificationModal from './components/SendNotificationModal';
import CreateFSRModal from './components/CreateFSRModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';
import SettingsModal from './components/SettingsModal';

import { SEND_NOTIFICATION } from './duck';
import { CREATE_FSR } from './duck';
import { CREATE_ANNOUNCEMENT } from './duck';
import { SETTINGS } from './duck';

const { Item: ListItem } = List;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAnnouncements();
    this.props.getNotifications();
    this.props.getLog();
  }

  render() {
    const {
      isSendNotificationModalOpen,
      isCreateFSRModalOpen,
      isCreateAnnouncementModalOpen,
      isSettingsModalOpen,
      isGettingNotifications,
      isGettingAnnouncements,

      searchedUsers,

      addNotification,
      addAnnouncement,
      addMetaData,

      announcements,
      notifications,
      log,

      toggleModal,
      searchUser,
    } = this.props;
    return (
      <div>
        <Row type="flex">
          <Col span={24}>
            <Button.Group style={styles.menu}>
              <SendNotificationModal
                isSendNotificationModalOpen={isSendNotificationModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
                searchedUsers={searchedUsers}
                searchUser={searchUser}
                addNotification={addNotification}
                notifications={notifications}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(SEND_NOTIFICATION)}
              >
                <Icon type="bell" style={styles.icons} />
                <p style={styles.description}>Send Notification</p>
              </Button>

              <CreateFSRModal
                isCreateFSRModalOpen={isCreateFSRModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(CREATE_FSR)}
              >
                <Icon type="file-add" style={styles.icons} />
                <p style={styles.description}>Create FSR</p>
              </Button>

              <CreateAnnouncementModal
                isCreateAnnouncementModalOpen={isCreateAnnouncementModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
                addAnnouncement={addAnnouncement}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}
              >
                <Icon type="notification" style={styles.icons} />
                <p style={styles.description}>Create Announcement</p>
              </Button>
              <SettingsModal
                isSettingsModalOpen={isSettingsModalOpen}
                toggleModal={toggleModal}
                handleAfterClose={this.handleAfterClose}
                addMetaData={addMetaData}
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(SETTINGS)}
              >
                <Icon type="setting" style={styles.icons} />
                <p style={styles.description}>Settings</p>
              </Button>
            </Button.Group>
          </Col>
        </Row>
        <div>
          <Row gutter={12} type="flex">
            <Col span={12}>
              <Card
                style={styles.announcement}
                title="Announcements"
                loading={isGettingAnnouncements}
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}
                  />,
                ]}
              >
                <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                  <List
                    bordered
                    size="large"
                    locale={{ emptyText: 'No current announcements' }}
                    dataSource={announcements}
                    itemLayout="horizontal"
                    renderItem={item => (
                      <ListItem
                        style={styles.listItems}
                        actions={[
                          <Icon style={styles.listItems} type="close-circle" />,
                        ]}
                      >
                        <Row style={styles.listItems}>
                          <h3 className="text primary">{item.title}</h3>
                          <p className="text normal">{item.body}</p>
                        </Row>
                      </ListItem>
                    )}
                  />
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={styles.announcement}
                title="Notifications"
                loading={isGettingNotifications}
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(SEND_NOTIFICATION)}
                  />,
                ]}
              >
                <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                  <List
                    bordered
                    size="large"
                    locale={{ emptyText: 'No notifications found' }}
                    dataSource={notifications}
                    itemLayout="horizontal"
                    renderItem={item => (
                      <ListItem
                        style={styles.listItems}
                        actions={[
                          <Icon style={styles.listItems} type="close-circle" />,
                        ]}
                      >
                        <Row type="flex" style={styles.listItems}>
                          <dl>
                            <dt>Sender</dt>
                            <dd>{item.senderID}</dd>
                          </dl>
                          <dl>
                            <dt>Receiver</dt>
                            <dd>{item.receiverID}</dd>
                          </dl>
                          <dl>
                            <dt>Message</dt>
                            <dd>{item.message}</dd>
                          </dl>
                          <dl>
                            <dt>Time</dt>
                            <dd>
                              {moment(item.timestamp).format(
                                'MMMM DD, YYYY hh:MM',
                              )}
                            </dd>
                          </dl>
                        </Row>
                      </ListItem>
                    )}
                  />
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={12} type="flex">
            <Col span={24}>
              <Card title="Logs">
                {/* <Switch /> */}
                <Table
                  //put slider which changes it to fsr submissions
                  columns={columns}
                  dataSource={log.map(row => ({
                    ...row,
                    timestamp: moment(row.timestamp).format(
                      'MMM DD YYYY hh:mm:ss A',
                    ),
                  }))}
                  // dataSource={[]}
                  style={styles.facultyTable}
                />
                {/* <List
                  bordered
                  size="large"
                  locale={{ emptyText: 'No logs found' }}
                  dataSource={log}
                  itemLayout="horizontal"
                  renderItem={item => (
                    <ListItem
                      style={styles.listItems}
                    >
                      <Row type="flex" style={styles.listItems}>
                        {item.timestamp}
                      </Row>
                    </ListItem>
                  )}
                /> */}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
