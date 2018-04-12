import React, { Component } from 'react';
import { Icon, Card, Progress, Table, Row, Col, Button } from 'antd';
import styles from './styles';
import dataSource from './datasource';
import columns from './columns';

import SendNotificationModal from './components/SendNotificationModal';
import CreateFSRModal from './components/CreateFSRModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';

import { SEND_NOTIFICATION } from './duck';
import { CREATE_FSR } from './duck';
import { CREATE_ANNOUNCEMENT } from './duck';

class Dashboard extends Component {
  render() {
    const {
      isSendNotificationModalOpen,
      isCreateFSRModalOpen,
      isCreateAnnouncementModalOpen,

      toggleModal,
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
              />
              <Button
                type="default"
                style={styles.menuItems}
                onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}
              >
                <Icon type="notification" style={styles.icons} />
                <p style={styles.description}>Create Announcement</p>
              </Button>
            </Button.Group>
          </Col>
        </Row>
        <div>
          <Row>
            <Col>
              <Card
                style={styles.announcement}
                title="Announcements"
                actions={[
                  <Icon type="setting" style={styles.iconsAnnouncement} />,
                  <Icon type="edit" style={styles.iconsAnnouncement} />,
                  <Icon type="delete" style={styles.iconsAnnouncement} />,
                ]}
              >
                <Card bordered={false}>No announcements available.</Card>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                style={styles.announcement}
                title="Notifications"
                actions={[
                  <Icon type="setting" style={styles.iconsAnnouncement} />,
                  <Icon type="edit" style={styles.iconsAnnouncement} />,
                  <Icon type="delete" style={styles.iconsAnnouncement} />,
                ]}
              >
                <Card bordered={false}>No notifications available.</Card>
              </Card>
            </Col>
          </Row>
          <Row gutter={12} type="flex">
            <Col span={8}>
              <Card title="Faculty Progress">
                <Progress
                  type="dashboard"
                  percent={30}
                  style={styles.progressBar}
                  width={200}
                />
              </Card>
            </Col>
            <Col span={16}>
              <Card title="Latest Submissions">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  style={styles.facultyTable}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
