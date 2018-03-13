import React, { Component } from 'react';
import { Row, Col } from 'antd';

import User from './User';

class UserList extends Component {
  render() {
    const { userData, expanded } = this.props;
    const gridConfig = { xxl: expanded ? 4 : 3, xl: 6, lg: 8, sm: 12, xs: 24 };
    const sortedData = userData.sort((a, b) => {
      if (a.lastName > b.lastName) return 1;
      else if (a.lastName < b.lastName) return -1;
      return 0;
    });

    return (
      <Row type="flex" gutter={16}>
        {sortedData.map(user => (
          <Col {...gridConfig}>
            <User
              title={`${user.lastName}, ${user.firstName}`}
              description={user.type}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

export default UserList;
