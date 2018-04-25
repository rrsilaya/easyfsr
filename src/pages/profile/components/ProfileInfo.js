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
      userLoggedIn,
      adminWork,
      service,
      creativeWork,
      limitedPractice,
      studyLoad,
      award,
      research,
      fsr,
      pushLink,
    } = this.props;
    const render = [
      <ServiceRecords key={0} fsr={fsr} pushLink={pushLink} />,
      <Research key={1} research={research} />,
      <Awards key={2} award={award} />,
      <AdminWork key={3} adminWork={adminWork} />,
      <CommunityService key={4} service={service} />,
      <CreativeWorks key={5} creativeWork={creativeWork} />,
      <LimitedPractices key={6} limitedPractice={limitedPractice} />,
      <StudyLoad key={7} studyLoad={studyLoad} />,
    ];

    if (userLoggedIn.acctType !== 'ADMIN' && !userLoggedIn.isHead)
      delete render[0];

    return (
      <StackGrid
        columnWidth="33.3333%"
        gutterWidth={16}
        gutterHeight={16}
        duration={0}
        gridRef={grid => (this.grid = grid)}
      >
        {render.map(component => component)}
      </StackGrid>
    );
  }
}

export default ProfileInfo;
