import React, { Component } from 'react';
import { Icon, Spin } from 'antd';

import styles from './styles';

class Loader extends Component {
  render() {
    return (
      <div className="fullpage" style={styles.wrapper}>
        <Spin indicator={<Icon type="loading" spin />} style={styles.loader} />
      </div>
    );
  }
}

export default Loader;
