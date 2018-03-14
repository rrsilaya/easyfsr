import React, { Component } from 'react';
import { Icon, Button, Card, Progress, Table, Row, Column } from 'antd';

import styles from './styles';
import actions from './actions';
import dataSource from './datasource';
import columns from './columns';

class FSRForm extends Component {
  render() {
    return (
      <div>
        <Row>
          <Card
            title="Faculty Service Record Form"
            style={styles.formFSR}
            actions={actions.map(action => <Icon type={action} />)}
          >
            Link of FSR Form
          </Card>
        </Row>
        <div>
          <Row>
            <Table
              columns={columns}
              dataSource={dataSource}
              style={styles.tableFSR}
            />
          </Row>
        </div>
      </div>
    );
  }
}

export default FSRForm;
