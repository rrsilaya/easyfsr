import React, { Component, Fragment } from 'react';
import { Button, Icon } from 'antd';
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

const { Group: ButtonGroup } = Button;

class FsrExport extends Component {
  componentDidMount() {
    this.props.getFSR(this.props.match.params.fsrID);
  }

  render() {
    const { fsr, isGettingFSR, pushState } = this.props;

    return (
      <div>
        {isGettingFSR ? (
          <PageLoader />
        ) : (
          <Fragment>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonGroup>
                <Button
                  size="large"
                  onClick={() =>
                    pushState(`/records/${this.props.match.params.fsrID}`)
                  }
                  ghost
                >
                  <Icon type="arrow-left" />
                </Button>
                <Printer
                  trigger={() => (
                    <Button ghost size="large" icon="solution">
                      Generate FSR
                    </Button>
                  )}
                  content={() => this.document}
                />
              </ButtonGroup>
            </div>
            <br />
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <div className="export-wrapper">
                <div className="fsrExport" ref={el => (this.document = el)}>
                  <div className="document">
                    <Header
                      meta={fsr.fsr}
                      user={fsr.user}
                      metadata={fsr.meta}
                    />
                    <TeachingLoad teachingLoad={fsr.subjects} meta={fsr.meta} />
                    <ResearchCreativeWork
                      researches={fsr.researches}
                      creativeWorks={fsr.creativeWorks}
                    />
                    <AdminWork adminWorks={fsr.adminWorks} />
                    <ExtCommServe services={fsr.services} />
                    <StudyLoad
                      studyLoad={fsr.studyLoad}
                      courses={fsr.courses}
                    />

                    <div className="right">
                      <label className="bold">
                        TOTAL FACULTY LOAD IN CREDIT UNITS
                      </label>
                      <div className="blank-field" style={{ width: 130 }}>
                        0
                      </div>
                    </div>

                    <LtdPracticeOfProfession
                      ltdPractices={fsr.ltdPractices[0]}
                    />
                    <Awards awards={fsr.awards[0]} />
                    <ConsultationHours
                      consultationHours={fsr.consultationHours}
                    />
                    <Certification />
                  </div>
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
