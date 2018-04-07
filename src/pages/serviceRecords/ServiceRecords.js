import React, { Component } from 'react';
import { List, Row, Col, Icon } from 'antd';
import { DataLoader } from '../../global';

import styles from './styles';

const { Item: ListItem } = List;

class ServiceRecords extends Component {
  render() {
    const gridConfig = { xl: 8, sm: 12, xs: 24 };

    return (
      <div>
        <DataLoader
          isLoading={true}
          content={
            <List
              bordered
              size="large"
              style={styles.list}
              className="text white"
              locale={{ emptyText: 'No service records found' }}
              dataSource={[]}
              renderItem={fsr => (
                <ListItem className="faculty-item">
                  <Row
                    type="flex"
                    justify="space-around"
                    style={styles.listItem}
                  >
                    <Col {...gridConfig} className="text normal">
                      {fsr.semester}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {fsr.acadYear}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {fsr.teachingLoadCreds}
                    </Col>
                  </Row>
                </ListItem>
              )}
            />
          }
        />
      </div>
    );
  }
}

export default ServiceRecords;
