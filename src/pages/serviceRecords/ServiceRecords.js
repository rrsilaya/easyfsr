import React, { Component } from 'react';
import { List, Row, Col } from 'antd';
import { DataLoader } from '../../global';

import styles from './styles';

const { Item: ListItem } = List;

class ServiceRecords extends Component {
  componentDidMount() {
    this.props.getFSRs();
  }

  render() {
    const gridConfig = { xl: 8, sm: 12, xs: 24 };
    const {
      fsr,
      isGettingFSR,

      pushLink,
    } = this.props;

    return (
      <div>
        <DataLoader
          isLoading={isGettingFSR}
          content={
            <List
              bordered
              size="large"
              style={styles.list}
              className="text white"
              locale={{ emptyText: 'No service records found' }}
              dataSource={fsr}
              renderItem={fsr => (
                <ListItem
                  className="list-item set-cursor pointer"
                  onClick={() => pushLink(`/records/${fsr.id}`)}
                >
                  <Row
                    type="flex"
                    justify="space-around"
                    style={styles.listItem}
                  >
                    <Col {...gridConfig} className="text normal">
                      {fsr.semester} Term
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
