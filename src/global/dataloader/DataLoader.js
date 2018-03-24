import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

import styles from './styles';

class DataLoader extends Component {
  render() {
    const { content, isLoading } = this.props;

    return (
      <div style={styles.wrapper}>
        {!!isLoading && (
          <div className="background primary overlay" style={styles.overlay}>
            <Spin
              style={styles.loader}
              indicator={<Icon type="loading" style={styles.spinner} spin />}
            />
          </div>
        )}
        {content}
      </div>
    );
  }
}

export default DataLoader;
