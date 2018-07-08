import React, { Component } from 'react';
import { Card, List, Row } from 'antd';
import moment from 'moment';

import style from '../../styles';

const { Item: ListItem } = List;

class LimitedPractices extends Component {
  render() {
    const { limitedPractice } = this.props;

    return (
      <Card title="Limited Practices">
        <List
          size="small"
          style={style.list}
          dataSource={limitedPractice}
          renderItem={limitedPractice => (
            <ListItem>
              <Row style={style.listItem} justify="center">
                <div>
                  <dl>
                    <dt>Date</dt>
                    <dd>
                      {moment(limitedPractice.date).format('MMMM D, YYYY')}
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

export default LimitedPractices;
