import React, { Component } from 'react';
import { List, Row, Col, Icon, Tooltip } from 'antd';
import { DataLoader } from '../../global';

import styles from './styles';
import Alerts from './components/Alerts';

const { Item: ListItem } = List;

class ServiceRecords extends Component {
  componentDidMount() {
    this.props.getFSRs({ userID: this.props.user.userID });
    this.props.getAnnouncements();
    this.props.getNotifications({ sortBy: 'DESC', field: 'timestamp' });
  }

  render() {
    const gridConfig = { xl: 8, sm: 12, xs: 24 };

    const {
      fsr,
      user,
      pushLink,
      announcements,
      notifications,

      isGettingFSR,
      isGettingNotifications,
      isGettingAnnouncements,
    } = this.props;

    return (
      <div>
        <DataLoader
          isLoading={isGettingNotifications || isGettingAnnouncements}
          content={
            announcements.length || notifications.length ? (
              <Alerts
                announcements={announcements}
                notifications={user.acctType === 'ADMIN' ? [] : notifications}
              />
            ) : (
              ''
            )
          }
          opaque
        />
        <h4>My Service Records</h4>
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
                  </Row>
                  <div style={styles.icons}>
                    {fsr.isTurnedIn ? (
                      fsr.isChecked ? (
                        <Tooltip title="Finalized" arrowPointAtCenter>
                          <Icon
                            style={{ color: 'green' }}
                            type="check-circle-o"
                            className="text secondary"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Turned In" arrowPointAtCenter>
                          <Icon type="check" className="text secondary" />
                        </Tooltip>
                      )
                    ) : (
                      <Tooltip title="Not Turned In" arrowPointAtCenter>
                        <Icon
                          style={{ color: 'red' }}
                          type="close-circle-o"
                          className="text secondary"
                        />
                      </Tooltip>
                    )}
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

export default ServiceRecords;
