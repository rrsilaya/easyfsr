import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Card, List } from 'antd';
import style from '../styles';

const { Item: ListItem } = List;

class ProfileInfo extends Component {
  render() {
    const { adminWork, service, isAdminWork } = this.props;

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
              size="small"
              style={style.list}
              dataSource={adminWork}
              renderItem={adminWork => (
                <ListItem>
                  <Row style={style.listItem} justify="center">
                    <h3 className="text primary">{adminWork.position}</h3>
                    <div>
                      <dl>
                        <dt>Office Unit</dt>
                        <dd>{adminWork.officeUnit}</dd>
                      </dl>
                    </div>
                  </Row>
                </ListItem>
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
              renderItem={service => (
                <ListItem>
                  <Row style={style.listItem} justify="center">
                    <h3 className="text primary">{service.title}</h3>
                    <div>
                      <dl>
                        <dt>Type</dt>
                        <dd>{service.type}</dd>
                      </dl>
                      <dl>
                        <dt>Role</dt>
                        <dd>{service.role}</dd>
                      </dl>
                      <dl>
                        <dt>Participants</dt>
                        <dd>{service.participant}</dd>
                      </dl>
                      <dl>
                        <dt>Date</dt>
                        <dd>
                          {moment(service.startDate).format('MMMM D, YYYY')} to{' '}
                          {moment(service.endDate).format('MMMM D, YYYY')}
                        </dd>
                      </dl>
                    </div>
                  </Row>
                </ListItem>
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
