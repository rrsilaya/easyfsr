import React, { Component } from 'react';
import { Icon, Button, Card, Progress, Table, Row, Col } from 'antd';
import styles from './styles';
import actions from './actions';
import dataSource from './datasource';
import columns from './columns';

class Dashboard extends Component {
  render() {
    return (
      <div style={{ padding: '30px' }}>
        <h1>Dashboard</h1>
        <Row>
          <Col span={32}>
            <Card
              title="Announcements"
              style={styles.announcement}
              actions={actions.map(action => <Icon type={action} />)}
            >
              No announcements available
            </Card>
          </Col>
        </Row>
        <div>
          <Row gutter={12}>
            <Col span={8}>
              <Card title="Faculty Progress">
                <Progress
                  type="dashboard"
                  percent={30}
                  width={200}
                  style={styles.progressBar}
                />
              </Card>
            </Col>
            <Col span={16}>
              <Card title="Latest Submissions">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  style={styles.facultyTable}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
