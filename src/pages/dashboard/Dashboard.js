import React, { Component } from 'react';
import { Icon, Button, Card, Progress, Table, Row, Column } from 'antd';
import styles from './styles';
import actions from './actions';
import dataSource from './datasource';
import columns from './columns';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row>
          <h1>Dashboard</h1>
          <Card
            title="Announcements"
            style={styles.announcement}
            actions={actions.map(action => <Icon type={action} />)}
          >
            No announcements available
          </Card>
        </Row>
        <div>
          <Row>
            <Card title="Faculty Progress">
              <Progress
                type="dashboard"
                percent={30}
                style={styles.progressBar}
              />
              <Table
                columns={columns}
                dataSource={dataSource}
                style={styles.facultyTable}
              />
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
