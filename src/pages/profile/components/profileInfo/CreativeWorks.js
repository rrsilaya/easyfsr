import React, { Component } from 'react';
import { Card, List, Row } from 'antd';
import moment from 'moment';

import style from '../../styles';

const { Item: ListItem } = List;

class CreativeWorks extends Component {
  render() {
    const { creativeWork } = this.props;

    return (
      <Card title="Creative Works">
        <List
          size="small"
          style={style.list}
          dataSource={creativeWork}
          renderItem={creativeWork => (
            <ListItem>
              <Row style={style.listItem} justify="center">
                <h3 className="text primary">{creativeWork.title}</h3>
                <div>
                  <dl>
                    <dt>Type</dt>
                    <dd>{creativeWork.type}</dd>
                  </dl>
                  <dl>
                    <dt>Co-Authors</dt>
                    <dd>{creativeWork.coAuthor}</dd>
                  </dl>
                  <dl>
                    <dt>Date</dt>
                    <dd>{moment(creativeWork.date).format('MMMM D, YYYY')}</dd>
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

export default CreativeWorks;
