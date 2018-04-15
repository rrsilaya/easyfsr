import React, { Component } from 'react';
import { Card, Row, List } from 'antd';
import moment from 'moment';
import StackGrid from 'react-stack-grid';

import style from '../styles';

const { Item: ListItem } = List;

class ProfileInfo extends Component {
  componentWillUpdate() {
    if (this.grid) {
      this.grid.updateLayout();
    }
  }

  render() {
    const { adminWork, service, isAdminWork } = this.props;

    const gridConfig = { xxl: 6, xl: 8, sm: 12, xs: 24 };

    return (
      <StackGrid
        columnWidth="33.3333%"
        gutterWidth={16}
        gutterHeight={16}
        gridRef={grid => (this.grid = grid)}
      >
        <Card title="Service Records" loading>
          Content
        </Card>
        <Card title="Awards" loading>
          Content
        </Card>
        <Card title="Research" loading>
          Content
        </Card>
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
        <Card title="Creative Works" loading>
          Content
        </Card>
        <Card title="Limited Practices" loading>
          Content
        </Card>
        <Card title="Study Load" loading>
          Content
        </Card>
      </StackGrid>
    );
  }
}

export default ProfileInfo;
