import React, { Component } from 'react';
import { Button, Input, Collapse } from 'antd';

import styles from '../styles';

const { Search } = Input;
const { Panel } = Collapse;

class SearchUser extends Component {
  searchLastName = value => {
    this.props.getUsers({ ...this.props.query, lastName: value });
    this.props.changeQuery({ lastName: value });
  };

  searchEmployeeID = value => {
    this.props.getUsers({ ...this.props.query, employeeID: value });
    this.props.changeQuery({ employeeID: value });
  };

  render() {
    const { toggleAddModal } = this.props;

    return (
      <div style={styles.search}>
        <Search
          id="lastName"
          placeholder="Search lastname..."
          enterButton="Search"
          size="large"
          style={styles.searchBar}
          onSearch={value => this.searchLastName(value)}
        />
        <Search
          id="employeeID"
          placeholder="Search employee ID"
          enterButton="Search"
          size="large"
          style={styles.searchBar}
          onSearch={value => this.searchEmployeeID(value)}
        />
        <Button
          size="large"
          icon="plus-circle-o"
          ghost
          onClick={toggleAddModal}
          style={styles.addButton}
        >
          Add User
        </Button>
      </div>
    );
  }
}

export default SearchUser;
