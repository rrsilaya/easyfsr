import React, { Component } from 'react';
import { List, Row, Col, Alert } from 'antd';
import { DataLoader } from '../../global';

import styles from './styles';

const { Item: ListItem } = List;

class ServiceRecords extends Component {
  componentDidMount() {
    this.props.getFSRs();
    this.props.getNotifications(this.props.match.params.notificationID);
    this.props.getAnnouncements(this.props.match.params.announcementID);
  }

  notificationPriority(notifications) {
    switch (notifications.priority) {
      case 'LOW':
        return <Alert message={notifications.message} type="success" />;
      case 'MEDIUM':
        return <Alert message={notifications.message} type="info" />;
      case 'HIGH':
        return <Alert message={notifications.message} type="warning" />;
      default:
        return <Alert message={notifications.message} type="success" />;
    }
  }

  render() {
    const gridConfig = { xl: 8, sm: 12, xs: 24 };
    const {
      fsr,
      isGettingFSR,
      announcements,
      isGettingAnnouncements,
      notifications,
      isGettingNotifications,
      pushLink,
    } = this.props;

    return (
      <div>
        <div>
          <List
            bordered
            size="small"
            style={styles.list}
            className="text white"
            locale={{ emptyText: 'No Announcements' }}
            dataSource={announcements}
            renderItem={announcements => (
              <ListItem>
                <Alert message={announcements.body} />
              </ListItem>
            )}
          />
        </div>
        <div>
          <List
            bordered
            size="small"
            style={styles.list}
            className="text white"
            locale={{ emptyText: 'No notifications' }}
            dataSource={notifications}
            renderItem={notifications => (
              <ListItem>{this.notificationPriority(notifications)}</ListItem>
            )}
          />
        </div>
        <div>
          <DataLoader
            isLoading={isGettingFSR}
            opaque={!!fsr}
            content={
              <List
                bordered
                size="large"
                style={styles.list}
                className="text white"
                locale={{ emptyText: 'No service records found' }}
                dataSource={fsr}
                renderItem={fsr => (
                  <ListItem
                    className="list-item set-cursor pointer"
                    onClick={() => pushLink(`/records/${fsr.id}`)}
                  >
                    <Row
                      type="flex"
                      justify="space-around"
                      style={styles.listItem}
                    >
                      <Col {...gridConfig} className="text normal">
                        {fsr.semester} Term
                      </Col>
                      <Col {...gridConfig} className="text meta-2">
                        {fsr.acadYear}
                      </Col>
                      <Col {...gridConfig} className="text meta-2">
                        {fsr.teachingLoadCreds}
                      </Col>
                    </Row>
                  </ListItem>
                )}
              />
            }
          />
        </div>
      </div>
    );
  }
}

export default ServiceRecords;
