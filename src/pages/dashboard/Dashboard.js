import React, { Component } from 'react';
import { Icon, Button, Card, Progress, Table, Row, Col, Radio } from 'antd';
import styles from './styles';
import actions from './actions';
import dataSource from './datasource';
import columns from './columns';

class Dashboard extends Component {
  render() {
    return (
      <div style={{ padding: '30px' }}>
        <h1>hello</h1>
        <div>
          <Button.Group>
            <Button type="primary">
              <Icon type="notification" style={styles.icons} />
              <p>Send Notification</p>
            </Button>
            <Button type="primary">
              <Icon type="file-add" style={styles.icons} />
              <p>Create FSR</p>
            </Button>
            <Button type="primary">
              <Icon type="edit" style={styles.icons} />
              <p>Edit FSR</p>
            </Button>
            <Button type="primary">
              <Icon type="eye-o" style={styles.icons} />
              <p>View FSR</p>
            </Button>
            <Button type="primary">
              <Icon type="download" style={styles.icons} />
              <p>Download FSR</p>
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

export default Dashboard;
