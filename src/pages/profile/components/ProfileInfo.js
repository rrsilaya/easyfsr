import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Card, List } from 'antd';
import style from '../styles';

const { Item: ListItem } = List;
class ProfileInfo extends Component {
  render() {
    const { user, adminWork, service, isAdminWork } = this.props;

    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };

    return (
      <Row type="flex" justify="center" gutter={16} className="gridTiles">
        <Col {...gridConfig}>
          <Card title="Service Records" loading>
            Content
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Awards" loading>
            Content
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Research" loading>
            Content
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Administrative Works">
            <List
              bordered
              size="small"
              style={style.list}
              dataSource={adminWork}
              renderItem={(user, i) => (
                <List.Item>
                  <Row
                    justify="space-around"
                    style={style.listItem}
                    className="profileInfo"
                  >
                    <h3 style={{ color: '#483440' }}>
                      Position: {user.position}{' '}
                    </h3>
                    <p style={{ color: '#483440' }}>
                      Office Unit: {user.officeUnit}{' '}
                    </p>
                    <p style={{ color: '#483440' }}>
                      Approved Units: {user.approvedUnits}{' '}
                    </p>
                  </Row>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Community Service">
            <List
              size="small"
              style={style.list}
              dataSource={service}
              renderItem={(user, j) => (
                <List.Item>
                  <Row style={style.listItem} justify="center">
                    <h3 style={{ color: '#483440' }}>Title: {user.title} </h3>
                    <p style={{ color: '#483440' }}>
                      Participant: {user.participant}{' '}
                    </p>
                    <p style={{ color: '#483440' }}>Role: {user.role} </p>
                    <p style={{ color: '#483440' }}>Hours: {user.hours} </p>
                    <p style={{ color: '#483440' }}>
                      Credit Unit: {user.creditUnit}{' '}
                    </p>
                    <p style={{ color: '#483440' }}>Type: {user.type} </p>
                    <p style={{ color: '#483440' }}>
                      Start:{' '}
                      {moment(user.startDate).format('MMMM Do YYYY, h:mm:ss a')}{' '}
                    </p>
                    <p style={{ color: '#483440' }}>
                      End:{' '}
                      {moment(user.endDate).format('MMMM Do YYYY, h:mm:ss a')}{' '}
                    </p>
                  </Row>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col {...gridConfig}>
          <Card title="Consultation Hours" loading>
            Content
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ProfileInfo;
