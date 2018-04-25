import React, { Component } from 'react';
import { Card, List, Row } from 'antd';
import moment from 'moment';

import style from '../../styles';

const { Item: ListItem } = List;

class Research extends Component {
  render() {
    const { research } = this.props;

    return (
      <Card title="Research">
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
                    <dt>Co-Workers</dt>
                    <dd>{research.coAuthor}</dd>
                  </dl>
                  <dl>
                    <dt>funding</dt>
                    <dd>{research.funding}</dd>
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
