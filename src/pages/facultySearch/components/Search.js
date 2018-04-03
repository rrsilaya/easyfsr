import React, { Component } from 'react';
import { Form, Input, Select, Button, Icon } from 'antd';

import styles from '../styles';

const { Group: InputGroup } = Input;
const { Option } = Select;

class Search extends Component {
  render() {
    const { form } = this.props;

    return (
      <Form style={styles.searchForm}>
        <InputGroup size="large" compact style={styles.searchGrid}>
          {form.getFieldDecorator('firstName@@facultySearch')(
            <Input style={styles.inputSearch} placeholder="First Name" />,
          )}
          {form.getFieldDecorator('lastName@@facultySearch')(
            <Input style={styles.inputSearch} placeholder="Last Name" />,
          )}
          {form.getFieldDecorator('sortBy@@facultySearch', {
            initialValue: 'ASC',
          })(
            <Select size="large" style={styles.sort} defaultValue="ASC">
              <Option value="ASC">Ascending</Option>
              <Option value="DESC">Descending</Option>
            </Select>,
          )}
          <Button size="large" htmlType="submit" type="primary">
            <Icon type="search" />
          </Button>
        </InputGroup>
      </Form>
    );
  }
}

export default Form.create()(Search);
