import React, { Component } from 'react';
import { List, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { DataLoader } from '../../global';
import Search from './components/Search';
import styles from './styles';

const { Item: ListItem } = List;

class FacultySearch extends Component {
  componentWillUnmount() {
    this.props.resetPage();
  }

  render() {
    const gridConfig = { xl: 8, sm: 12, xs: 24 };
    const {
      // State
      users,
      isSearching,
      changeSelectedUser,

      // Dispatch
      searchUser,
      user,
    } = this.props;

    return (
      <div>
        <Search searchUser={searchUser} />
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
                      {item.firstName}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {item.lastName}
                    </Col>
                    <Col {...gridConfig} className="text meta-2">
                      {item.middleName}
                    </Col>
                  </Row>
                  <div style={styles.icons}>
                    <Icon className="text secondary" type="solution" />
                    <Icon
                      className="text secondary"
                      type="message"
                      style={styles.message}
                    />
                    <Link to={`/profile/${item.employeeID}`}>
                      <Icon type="profile" className="text secondary" />
                    </Link>,
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
