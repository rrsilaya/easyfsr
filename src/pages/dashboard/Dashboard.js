import React, { Component } from 'react';
import { Icon, Card, Progress, Table, Row, Col, Button, List } from 'antd';
import styles from './styles';
import dataSource from './datasource';
import columns from './columns';

import SendNotificationModal from './components/SendNotificationModal';
import CreateFSRModal from './components/CreateFSRModal';
import CreateAnnouncementModal from './components/CreateAnnouncementModal';

import { SEND_NOTIFICATION } from './duck';
import { CREATE_FSR } from './duck';
import { CREATE_ANNOUNCEMENT } from './duck';

const { Item: ListItem } = List;

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

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
          <Row gutter={12} type="flex">
            <Col span={12}>
              <Card
                style={styles.announcement}
                title="Announcements"
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(CREATE_ANNOUNCEMENT)}
                  />,
                ]}
              >
                <List
                  bordered
                  size="large"
                  locale={{ emptyText: 'No service records found' }}
                  dataSource={data}
                  itemLayout="horizontal"
                  renderItem={item => (
                    <ListItem actions={[<Icon type="close-circle" />]}>
                      {item}
                    </ListItem>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={styles.announcement}
                title="Notifications"
                actions={[
                  <Icon
                    type="plus-circle-o"
                    style={styles.iconsAnnouncement}
                    onClick={() => toggleModal(SEND_NOTIFICATION)}
                  />,
                ]}
              >
                <List
                  bordered
                  size="large"
                  locale={{ emptyText: 'No service records found' }}
                  dataSource={data}
                  itemLayout="horizontal"
                  renderItem={item => (
                    <ListItem actions={[<Icon type="close-circle" />]}>
                      {item}
                    </ListItem>
                  )}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={12} type="flex">
            {/* <Col span={12}>
              <Card title="Faculty Progress">
                <Progress
                  type="dashboard"
                  percent={30}
                  style={styles.progressBar}
                  width={200}
                />
              </Card>
            </Col> */}
            <Col span={24}>
              <Card title="Logs">
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
