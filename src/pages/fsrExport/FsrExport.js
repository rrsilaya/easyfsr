import React, { Component, Fragment } from 'react';
import Printer from 'react-to-print';
import { Button, Icon } from 'antd';
import { PageLoader } from '../../global';
import {
  Header,
  TeachingLoad,
  ResearchCreativeWork,
  AdminWork,
  ExtCommServe,
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
            <div className="fsrExport" ref={el => (this.document = el)}>
              <div className="document">
                <Header meta={fsr.fsr} />
                <TeachingLoad teachingLoad={fsr.subjects} />
                <ResearchCreativeWork creativeWorks={fsr.creativeWorks} />
                <AdminWork adminWorks={fsr.adminWorks} />
                <ExtCommServe />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default FsrExport;
