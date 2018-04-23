import React, { Component, Fragment } from 'react';
import { Alert, Collapse, Badge } from 'antd';
import moment from 'moment';

const { Panel } = Collapse;

const styles = {
  panel: {
    backgroundColor: '#6A4C5E',
    border: 0,
    borderRadius: 0,
    color: '#fff',
    fontSize: 22,
  },
  alerts: {
    display: 'inline-block',
    fontWeight: 'bold',
    marginRight: '1.5em',
    fontSize: 22,
  },
  badge: {
    border: '1px solid rgba(255, 255, 255, 0.4)',
    backgroundColor: '#6A4C5E',
  },
};

class Alerts extends Component {
  render() {
    const { announcements, notifications } = this.props;

    return (
      <Collapse bordered={false} style={{ marginBottom: '1.5em' }}>
        <Panel
          header={
            <Fragment>
              <span style={styles.alerts}>Show Alerts</span>
              <Badge
                style={styles.badge}
                count={announcements.length + notifications.length}
              />
            </Fragment>
          }
          key="1"
          style={styles.panel}
        >
          {announcements.map(announcement => (
            <Alert
              key={announcement.announcementID}
              message={announcement.title}
              className="text normal"
              description={announcement.body}
              type="info"
              style={{ marginBottom: '1em' }}
              showIcon
            />
          ))}
          {notifications.map(notification => (
            <Alert
              key={notification.notificationID}
              message={notification.message}
              description={moment(notification.timestamp).format(
                'MMMM DD, YYYY hh:mm A',
              )}
              style={{ marginBottom: '1em' }}
              type={(() => {
                switch (notification.priority) {
                  case 'HIGH':
                    return 'error';
                  case 'NORMAL':
                    return 'warning';
                  case 'LOW':
                    return 'info';
                  default:
                    return 'info';
                }
              })()}
            />
          ))}
        </Panel>
      </Collapse>
    );
  }
}

export default Alerts;
