import React, { Component } from 'react';
import { Card, Icon, Avatar } from 'antd';

import styles from '../styles';

const { Meta } = Card;

class Faculty extends Component {
  render() {
    return (
      <Card
        bordered={false}
        style={styles.card}
        actions={[
          <Icon type="edit" className="text normal" />,
          <Icon type="delete" className="text normal" />,
          <Icon type="profile" className="text normal" />,
        ]}
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

export default Faculty;

//nasa loob ng folder na components
