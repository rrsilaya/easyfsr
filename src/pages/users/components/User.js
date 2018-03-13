import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';

import styles from './styles';
import actions from './actions';

const { Meta } = Card;

class User extends Component {
  render() {
    return (
      <Card
        bordered={false}
        style={styles.card}
        hoverable
        actions={actions.map(action => <Icon type={action} />)}
      >
        <Meta
          avatar={<Avatar size="large" icon="user" />}
          title={this.props.title}
          description={this.props.description}
        />
      </Card>
    );
  }
}

export default User;
