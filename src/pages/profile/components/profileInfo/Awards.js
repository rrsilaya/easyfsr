import React, { Component } from 'react';
import { Card } from 'antd';

class Awards extends Component {
  render() {
    return (
      <Card title="Awards">
        <List
          size="small"
          style={style.list}
          dataSource={award}
          renderItem={award => (
            <ListItem>
              <Row style={style.listItem} justify="center">
                <h3 className="text primary">{award.title}</h3>
                <div>
                  <dl>
                    <dt>Recipient or Nominee</dt>
                    <dd>{award.recipientOrNominee}</dd>
                  </dl>
                  <dl>
                    <dt>College Has Already Nominated</dt>
                    <dd>{award.collegeHasNominated}</dd>
                  </dl>
                  <dl>
                    <dt>Professional Chair</dt>
                    <dd>{award.professionChair}</dd>
                  </dl>
                  <dl>
                    <dt>Grant</dt>
                    <dd>{award.grantF}</dd>
                  </dl>
                  <dl>
                    <dt>Chair Grant Title</dt>
                    <dd>{award.chairGrantTitle}</dd>
                  </dl>
                  <dl>
                    <dt>Date</dt>
                    <dd>
                      {moment(award.approvedStartDate).format('MMMM D, YYYY')} to{' '}
                      {moment(award.endDate).format('MMMM D, YYYY')}
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
