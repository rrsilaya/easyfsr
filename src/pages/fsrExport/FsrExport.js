import React, { Component, Fragment } from 'react';
import Printer from './Printer';
import { Button } from 'antd';
import { PageLoader } from '../../global';
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
import { handleDOMPrint } from './printScript';

class FsrExport extends Component {
  componentDidMount() {
    this.props.getFSR(this.props.match.params.fsrID);
  }

  handlePrint = () => {
    handleDOMPrint(this.document);
  };

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
                <LtdPracticeOfProfession />
                <Awards />
                <ConsultationHours />
                <Certification />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default FsrExport;
