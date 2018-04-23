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
  ServiceRecords,
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
    const {
      adminWork,
      service,
      creativeWork,
      limitedPractice,
      studyLoad,
      award,
      research,
      fsr,
    } = this.props;

    return (
      <StackGrid
        columnWidth="33.3333%"
        gutterWidth={16}
        gutterHeight={16}
        duration={0}
        gridRef={grid => (this.grid = grid)}
      >
        <ServiceRecords fsr={fsr} />
        <Research research={research} />
        <Awards award={award} />
        <AdminWork adminWork={adminWork} />
        <CommunityService service={service} />
        <CreativeWorks creativeWork={creativeWork} />
        <LimitedPractices limitedPractice={limitedPractice} />
        <StudyLoad studyLoad={studyLoad} />
      </StackGrid>
    );
  }
}

export default ProfileInfo;
