import React, { Component } from 'react';
import Printer from 'react-to-print';
import { Button, Icon } from 'antd';
import {
  Header,
  TeachingLoad,
  ResearchCreativeWork,
  AdminWork,
  ExtCommServe,
} from './components';

class FsrExport extends Component {
  render() {
    return (
      <div>
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
            <Header />
            <TeachingLoad />
            <ResearchCreativeWork />
            <AdminWork />
            <ExtCommServe />
          </div>
        </div>
      </div>
    );
  }
}

export default FsrExport;
