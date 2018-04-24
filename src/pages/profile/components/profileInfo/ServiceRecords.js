import React, { Component } from 'react';
import { Card, List, Row } from 'antd';

import style from '../../styles';

const { Item: ListItem } = List;

class ServiceRecords extends Component {
  render() {
    const { fsr, pushLink } = this.props;

    return (
      <Card title="Service Records">
        <List
          size="small"
          style={style.list}
          dataSource={fsr}
          renderItem={fsr => (
            <ListItem
              className="list-item set-cursor pointer"
              onClick={() => pushLink(`/records/${fsr.id}`)}
            >
              <Row style={style.listItem} justify="center">
                <h3 className="text primary">{fsr.semester} Term</h3>
                <div>
                  <dl>
                    <dt>Academic Year</dt>
                    <dd>{fsr.acadYear}</dd>
                  </dl>
                  <dl>
                    <dt>Teaching Load</dt>
                    <dd>{fsr.teachingLoadCreds}</dd>
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

export default ServiceRecords;
