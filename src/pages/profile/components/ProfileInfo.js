import React, { Component } from 'react';
import { Card, Row, List } from 'antd';
import moment from 'moment';
import StackGrid from 'react-stack-grid';

import style from '../styles';

const { Item: ListItem } = List;

class ProfileInfo extends Component {
  componentDidUpdate() {
    if (
      !Object.keys(this.props.isLoadingCards)
        .map(key => this.props.isLoadingCards[key])
        .every(e => e)
    ) {
      setTimeout(() => {
        this.grid.updateLayout();
      }, 1000);
    }
  }

  render() {
    const {
      userID,

      getAdminWork,
      getService,

      adminWork,
      service,
    } = this.props;

    return (
      <StackGrid
        columnWidth="33.3333%"
        gutterWidth={16}
        gutterHeight={16}
        duration={0}
        gridRef={grid => (this.grid = grid)}
      />
    );
  }
}

export default ProfileInfo;
