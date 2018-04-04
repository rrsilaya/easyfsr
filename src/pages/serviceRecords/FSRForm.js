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

const { Item: ListItem } = List;

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
    const gridConfig = { xl: 8, sm: 12, xs: 24 };

    return (
      <div>
        <h1>Faculty Service Record</h1>
        <div>
          <List
            bordered
            size="large"
            style={styles.list}
            className="text white"
            columns={columns}
            dataSource={dataSource}
            renderItem={item => (
              <ListItem className="faculty-item" style={styles.listItem}>
                <Row type="flex" justify="space-around" style={styles.info}>
                  <Col {...gridConfig} className="text meta-2 center">
                    {item.year}
                  </Col>
                  <Col {...gridConfig} className="text meta-2 center">
                    {item.term}
                  </Col>
                  <Col {...gridConfig} className="text meta-2 center">
                    {item.form}
                  </Col>
                </Row>
                <div style={styles.icons}>
                  <Link to={`/FormSample/${item.link}`}>
                    <Icon className="text meta-2" type="edit" />
                  </Link>
                  <Icon
                    className="text meta-2"
                    type="download"
                    style={styles.message}
                  />
                </div>
              </ListItem>
            )}
          />
        </div>
      </div>
    );
  }
}

export default FSRForm;
