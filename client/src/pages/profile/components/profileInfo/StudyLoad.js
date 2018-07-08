import React, { Component } from 'react';
import { Card, List, Row } from 'antd';

import style from '../../styles';

const { Item: ListItem } = List;

class StudyLoad extends Component {
  render() {
    const { studyLoad } = this.props;

    return (
      <Card title="Study Load">
        <List
          size="small"
          style={style.list}
          dataSource={studyLoad}
          renderItem={studyLoad => (
            <ListItem>
              <Row style={style.listItem} justify="center">
                <h3 className="text primary">{studyLoad.degree}</h3>
                <div>
                  <dl>
                    <dt>University</dt>
                    <dd>{studyLoad.university}</dd>
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

export default StudyLoad;
