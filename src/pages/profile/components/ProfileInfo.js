import React, { Component } from 'react';
import { Card } from 'antd';
import StackGrid from 'react-stack-grid';

import {
  Research,
  Awards,
  AdminWork,
  CommunityService,
  CreativeWorks,
  LimitedPractices,
  StudyLoad,
} from './profileInfo/';

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
    const { adminWork, service } = this.props;

    return (
      <StackGrid
        columnWidth="33.3333%"
        gutterWidth={16}
        gutterHeight={16}
        duration={0}
        gridRef={grid => (this.grid = grid)}
      >
        <Card title="Service Records" loading>
          Content
        </Card>
        <Research />
        <Awards />
        <AdminWork adminWork={adminWork} />
        <CommunityService service={service} />
        <CreativeWorks />
        <LimitedPractices />
        <StudyLoad />
      </StackGrid>
    );
  }
}

export default ProfileInfo;
