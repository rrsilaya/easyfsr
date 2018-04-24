import React, { Component } from 'react';
import moment from 'moment';

class Awards extends Component {
  render() {
    const { awards = {} } = this.props;

    return (
      <section>
        <div className="header bold">
          VII. PROFESSORIAL CHAIR or FACULTY GRANT RECIPIENT or NOMINEE
        </div>
        <div>
          <div className="inline-flex">
            <div>
              Please write NA on the space on the right if neither a recipient
              nor a nominee
            </div>
            <div
              className="blank-field"
              style={{ width: 150, marginRight: 40 }}
            >
              {!awards ? 'NA' : <span>&nbsp;</span>}
            </div>
          </div>
          <div className="inline-flex">
            <div>
              No appointment has been approved as of today but college has
              already nominated: (Y/N)
            </div>
            <div
              className="blank-field"
              style={{ width: 150, marginRight: 40 }}
            >
              {awards.collegeHasNominated ? (
                awards.collegeHasNominated[0]
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </div>
          <div className="inline-flex">
            <div>
              <label>PROFESSORIAL CHAIR</label>
              <div className="blank-field" style={{ width: 120 }}>
                {awards.professionalChair}
              </div>
            </div>
            <div>
              <label>GRANT</label>
              <div className="blank-field" style={{ width: 120 }}>
                {awards.grantF}
              </div>
            </div>
            <div>
              <label>GRANT/GRANT TITLE</label>
              <div className="blank-field" style={{ width: 120 }}>
                {awards.chairGrantTitle}
              </div>
            </div>
          </div>
          <div className="inline-flex">
            <div>
              <label>APPROVED START DATE (MM/DD/YY)</label>
              <div className="blank-field" style={{ width: 120 }}>
                {awards.approvedStartDate ? (
                  moment(awards.approvedStartDate).format('MM/DD/YY')
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
            <div>
              <label>END DATE (MM/DD/YY)</label>
              <div className="blank-field" style={{ width: 120 }}>
                {awards.endDate ? (
                  moment(awards.endDate).format('MM/DD/YY')
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Awards;
