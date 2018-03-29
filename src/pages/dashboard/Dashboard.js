import React, { Component } from 'react';
import { Icon, Button, Card, Progress, Table, Row, Col } from 'antd';
import styles from './styles';
import dataSource from './datasource';
import columns from './columns';

class Dashboard extends Component {
  render() {
    return (
      <div style={{ padding: '30px' }}>
        <h1>Dashboard</h1>
        <Row type="flex">
          <Col span={24}>
            {/* <div style={styles.menu}> */}
            <Button.Group style={styles.menu}>
              <Button type="default" style={styles.menuItems}>
                <Icon type="notification" style={styles.icons} />
                <p style={styles.description}>Send Notification</p>
              </Button>
              <Button type="default" style={styles.menuItems}>
                <Icon type="file-add" style={styles.icons} />
                <p style={styles.description}>Create FSR</p>
              </Button>
              <Button type="default" style={styles.menuItems}>
                <Icon type="edit" style={styles.icons} />
                <p style={styles.description}>Edit FSR</p>
              </Button>
              <Button type="default" style={styles.menuItems}>
                <Icon type="eye-o" style={styles.icons} />
                <p style={styles.description}>View FSR</p>
              </Button>
              <Button type="default" style={styles.menuItems}>
                <Icon type="download" style={styles.icons} />
                <p style={styles.description}>Download FSR</p>
              </Button>
            </Button.Group>
            {/* </div> */}
          </Col>
        </Row>
        <div>
          <Row gutter={12} type="flex">
            <Col span={8}>
              <Card title="Faculty Progress">
                <Progress
                  type="dashboard"
                  percent={30}
                  style={styles.progressBar}
                  width={200}
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
