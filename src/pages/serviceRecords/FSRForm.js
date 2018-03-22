import React, { Component } from 'react';
import { Icon, Button, Card, Progress, Table, Row, Column, Menu } from 'antd';
import styles from './styles';
import actions from './actions';
import dataSource from './datasource';
import columns from './columns';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class FSRForm extends Component {
  state = {
    current: 'mail',
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Card title="Faculty Service Record Form" style={styles.formFSR}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="alipay">
                <a href="/FormSample" target="_blank" rel="noopener noreferrer">
                  FSR Form - Link
                </a>
              </Menu.Item>
            </Menu>
          </Card>
        </Row>
        <div>
          <Row>
            <Table
              columns={columns}
              dataSource={dataSource}
              style={styles.formFSR}
            />
          </Row>
        </div>
      </div>
    );
  }
}

export default FSRForm;
