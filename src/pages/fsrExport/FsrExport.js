import React, { Component } from 'react';
import { Header, TeachingLoad } from './components/';

class FsrExport extends Component {
  render() {
    return (
      <div>
        <div className="fsrExport">
          <div className="document">
            <Header />
            <TeachingLoad />
          </div>
        </div>
      </div>
    );
  }
}

export default FsrExport;
