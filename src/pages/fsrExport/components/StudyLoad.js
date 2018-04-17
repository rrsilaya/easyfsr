import React, { Component } from 'react';

class StudyLoad extends Component {
  render() {
    return (
      <section>
        <div className="header bold">V. STUDY LOAD</div>
        <div className="right">
          <label>Degree enrolled in:</label>
          <div
            className="blank-field"
            style={{ width: 150, marginRight: '3em' }}
          >
            &nbsp;
          </div>

          <label>University enrolled in:</label>
          <div className="blank-field" style={{ width: 150 }} />
        </div>
        <br />
        <div className="inline-flex">
          <div>
            <label>On full study leave with pay?</label>
            <label>Yes</label>
            <div
              className="blank-field"
              style={{ width: 50, marginRight: '1em' }}
            >
              &nbsp;
            </div>
            <label>No</label>
            <div className="blank-field" style={{ width: 50 }}>
              &nbsp;
            </div>
          </div>
          <div>
            <label>Recipient of faculty fellowship?</label>
            <label>Yes</label>
            <div
              className="blank-field"
              style={{ width: 50, marginRight: '1em' }}
            >
              &nbsp;
            </div>
            <label>No</label>
            <div className="blank-field" style={{ width: 50 }}>
              &nbsp;
            </div>
          </div>
        </div>
        <br />
        <div style={{ marginLeft: 40 }}>
          FOR FACULTY MEMBERS WITH SOME TEACHING LOAD BUT ALSO HAVE STUDY LOADS:{' '}
          <br />
          Study Load CREDITS (i.e. study load counted as part of normal 12-unit
          faculty load) <br />
          Study Load Units (i.e. study load done above a full teaching load)
        </div>
      </section>
    );
  }
}

export default StudyLoad;
