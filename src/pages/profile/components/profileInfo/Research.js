import React, { Component } from 'react';
import { Card } from 'antd';

import style from '../../styles';

class Research extends Component {
  render() {
    return (
      <Card title="Research" loading>
        <List
          size="small"
          style={style.list}
          dataSource={research}
          renderItem={research => (
            <ListItem>
              <Row style={style.listItem} justify="center">
                <h3 className="text primary">{research.title}</h3>
                <div>
                  <dl>
                    <dt>Type</dt>
                    <dd>{research.type}</dd>
                  </dl>
                  <dl>
                    <dt>Role</dt>
                    <dd>{research.role}</dd>
                  </dl>
                  <dl>
                    <dt>Date</dt>
                    <dd>
                      {moment(research.startDate).format('MMMM D, YYYY')} to{' '}
                      {moment(research.endDate).format('MMMM D, YYYY')}
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

export default Research;
