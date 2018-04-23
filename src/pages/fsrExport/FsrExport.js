import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import { PageLoader, Printer } from '../../global';
import {
  Header,
  TeachingLoad,
  ResearchCreativeWork,
  AdminWork,
  ExtCommServe,
  StudyLoad,
  LtdPracticeOfProfession,
  Awards,
  ConsultationHours,
  Certification,
} from './components';

class FsrExport extends Component {
  componentDidMount() {
    this.props.getFSR(this.props.match.params.fsrID);
  }

  render() {
    const { fsr, isGettingFSR } = this.props;

    return (
      <div>
        {isGettingFSR ? (
          <PageLoader />
        ) : (
          <Fragment>
            <Printer
              trigger={() => (
                <Button type="primary" size="large">
                  Print
                </Button>
              )}
              content={() => this.document}
            />
            <br />
            <br />
            <div className="export-wrapper">
              <div className="fsrExport" ref={el => (this.document = el)}>
                <div className="document">
                  <Header meta={fsr.fsr} user={fsr.user} metadata={fsr.meta} />
                  <TeachingLoad teachingLoad={fsr.subjects} meta={fsr.meta} />
                  <ResearchCreativeWork
                    researches={fsr.researches}
                    creativeWorks={fsr.creativeWorks}
                  />
                  <AdminWork adminWorks={fsr.adminWorks} />
                  <ExtCommServe />
                  <StudyLoad />
                  <LtdPracticeOfProfession ltdPractices={fsr.ltdPractices[0]} />
                  <Awards awards={fsr.awards[0]} />
                  <ConsultationHours
                    consultationHours={fsr.consultationHours}
                  />
                  <Certification />
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default FsrExport;
