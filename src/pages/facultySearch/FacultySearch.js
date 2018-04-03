import React, { Component } from 'react';
import { List, Icon, Row, Col } from 'antd';
import { DataLoader } from '../../global';

import Search from './components/Search';
import styles from './styles';

const { Item: ListItem } = List;

class FacultySearch extends Component {
  render() {
    const gridConfig = { xl: 8, sm: 12, xs: 24 };
    const {
      // State
      users,
      isSearching,

      // Dispatch
    } = this.props;

    return (
      <div>
        <Search />
        <DataLoader
          isLoading={isSearching}
          content={
            <List
              bordered
              size="large"
              style={styles.list}
              locale={{ emptyText: 'No users found' }}
              className="text white"
              dataSource={users}
              renderItem={item => (
                <ListItem className="faculty-item" style={styles.listItem}>
                  <Row type="flex" justify="space-around" style={styles.info}>
                    <Col {...gridConfig} className="text normal">
                      {item.name}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {item.name}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {item.name}
                    </Col>
                  </Row>
                  <div style={styles.icons}>
                    <Icon className="text secondary" type="solution" />
                    <Icon
                      className="text secondary"
                      type="message"
                      style={styles.message}
                    />
                    <Icon className="text secondary" type="profile" />
                  </div>
                </ListItem>
              )}
            />
          }
        />
      </div>
    );
  }
}

export default FacultySearch;
