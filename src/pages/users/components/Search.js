import React, { Component } from 'react';
import { Button, Input, Collapse, Row, Col } from 'antd';

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
      <Form className="advanced-search">
        <Row type="flex" gutter={16} />
      </Form>
    );
  }
}

export default Form.create()(SearchUser);
