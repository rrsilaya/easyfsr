import React, { Component } from 'react';
import moment from 'moment';

class LtdPracticeOfProfession extends Component {
  render() {
    const { ltdPractices } = this.props;

    return (
      <section>
        <div className="header bold">VI. LIMITED PRACTICE OF PROFESSION</div>
        <div className="inline-flex">
          <div>
            Have you applied for official permission for limited practice of
            profession?
          </div>
          <div>
            <label>Yes</label>
            <div
              className="blank-field"
              style={{ width: 70, marginRight: '2em' }}
            >
              {!!ltdPractices[0].askedPermission ? 'X' : <span>&nbsp;</span>}
            </div>
            <label>No</label>
            <div className="blank-field" style={{ width: 70 }}>
              {!ltdPractices[0].askedPermission ? 'X' : <span>&nbsp;</span>}
            </div>
          </div>
        </div>
        <div className="inline-flex">
          <div>If yes, indicate date (MM/DD/YY) permission was submitted</div>
          <div>
            <div
              className="blank-field"
              style={{ width: 100, marginRight: '2em' }}
            >
              {!!ltdPractices[0].askedPermission ? (
                moment(ltdPractices[0].date).format('MM/DD/YY')
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
            <label>or approved</label>
            <div className="blank-field" style={{ width: 100 }}>
              &nbsp;
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LtdPracticeOfProfession;
