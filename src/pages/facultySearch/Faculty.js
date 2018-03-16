import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';

import styles from './styles';
import actions from './actions';

const { Meta } = Card;

class Faculty extends Component {
  render() {
    return (
      <Card
       
        style={styles.card}
        hoverable
        
      >
        <Meta
          avatar={<Avatar size="medium" icon="user" />}
          title={this.props.title}
          description={this.props.description}
        />
      </Card>
    );
  }
}

export default Faculty;


