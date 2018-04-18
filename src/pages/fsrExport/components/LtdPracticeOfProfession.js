import React, { Component } from 'react';

class LtdPracticeOfProfession extends Component {
  render() {
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
              &nbsp;
            </div>
            <label>No</label>
            <div className="blank-field" style={{ width: 70 }}>
              &nbsp;
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
              &nbsp;
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
