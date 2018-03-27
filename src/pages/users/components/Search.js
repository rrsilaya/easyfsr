import React, { Component } from 'react';
import { Button, Row, Col, Pagination, Input } from 'antd';

import styles from '../styles';

const { Search } = Input;

class SearchUser extends Component {
  render() {
    const { toggleAddModal } = this.props;

    return (
      <div style={styles.search}>
        <Search
          placeholder="Search user..."
          enterButton="Search"
          size="large"
          style={styles.searchBar}
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
