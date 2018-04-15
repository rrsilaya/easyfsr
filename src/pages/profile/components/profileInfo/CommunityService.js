import React, { Component } from 'react';
import { Card, List, Row } from 'antd';
import moment from 'moment';

import style from '../../styles';

const { Item: ListItem } = List;

class CommunityService extends Component {
  render() {
    const { service } = this.props;

    return (
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
    );
  }
}

export default CommunityService;
