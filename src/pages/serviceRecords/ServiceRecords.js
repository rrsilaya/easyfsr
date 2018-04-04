import React, { Component } from 'react';
import { Col, List } from 'antd';
import styles from './styles';
import dataSource from './datasource';
import columns from './columns';
import { Link } from 'react-router-dom';

const { Item } = List;

class ServiceRecords extends Component {
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
                    <Link to={`/FSRForm/${item.form}`}>
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

export default ServiceRecords;
