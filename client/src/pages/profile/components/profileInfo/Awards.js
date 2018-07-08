import React, { Component } from 'react';
import { Card, List, Row } from 'antd';
import moment from 'moment';

import style from '../../styles';

const { Item: ListItem } = List;

class Awards extends Component {
  render() {
    const { award } = this.props;

    return (
      <Card title="Awards">
        <List
          size="small"
          style={style.list}
          dataSource={award}
          renderItem={award => (
            <ListItem>
              <Row style={style.listItem} justify="center">
                <h3 className="text primary">{award.chairGrantTitle}</h3>
                <div>
                  <dl>
                    <dt>Status</dt>
                    <dd>{award.recipientOrNominee}</dd>
                  </dl>
                  <dl>
                    <dt>Already Nominated</dt>
                    <dd>{award.collegeHasNominated}</dd>
                  </dl>
                  <dl>
                    <dt>Professorial Chair</dt>
                    <dd>{award.professionalChair}</dd>
                  </dl>
                  <dl>
                    <dt>Grant</dt>
                    <dd>{award.grantF}</dd>
                  </dl>
                  <dl>
                    <dt>Date</dt>
                    <dd>
                      {moment(award.approvedStartDate).format('MMMM D, YYYY')}{' '}
                      to {moment(award.endDate).format('MMMM D, YYYY')}
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

export default Awards;
