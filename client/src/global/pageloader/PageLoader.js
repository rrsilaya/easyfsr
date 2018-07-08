import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

import styles from './styles';

class PageLoader extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <Spin indicator={<Icon type="loading" style={styles.spinner} spin />} />
      </div>
    );
  }
}

export default PageLoader;
