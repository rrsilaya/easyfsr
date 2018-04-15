import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

import styles from './styles';

class DataLoader extends Component {
  render() {
    const {
      content,
      isLoading,
      opaque = false,
      color: backgroundColor,
      spinColor = '#fff',
    } = this.props;

    return (
      <div style={styles.wrapper}>
        {!!isLoading && (
          <div
            className={`background primary ${opaque ? '' : 'overlay'}`}
            style={{ ...styles.overlay, backgroundColor }}
          >
            <Spin
              style={styles.loader}
              indicator={
                <Icon
                  type="loading"
                  style={{ ...styles.spinner, color: spinColor }}
                  spin
                />
              }
            />
          </div>
        )}
        {content}
      </div>
    );
  }
}

export default DataLoader;
