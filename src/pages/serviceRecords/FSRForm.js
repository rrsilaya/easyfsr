import React, { Component } from 'react';
import {
  Icon,
  Button,
  Card,
  Progress,
  Table,
  Row,
  Col,
  Menu,
  List,
} from 'antd';
import styles from './styles';
import actions from './actions';
import dataSource from './datasource';
import columns from './columns';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Item } = List;

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
        <h1>Faculty Service Record</h1>
        <div>
          <List
            bordered
            columns={columns}
            dataSource={dataSource}
            style={styles.tableFSR}
            renderItem={item => (
              <Item>
                <Col span={8}>
                  <div>{item.year}</div>
                </Col>
                <Col span={8}>
                  <div>{item.term}</div>
                </Col>
                <Col span={8}>
                  <div>
                    <Link to={`/FormSample/${item.link}`}>
                      Faculty Service Record
                    </Link>
                  </div>
                </Col>
              </Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default FSRForm;
