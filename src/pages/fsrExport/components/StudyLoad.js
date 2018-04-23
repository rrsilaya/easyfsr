import React, { Component } from 'react';

class StudyLoad extends Component {
  render() {
    const { studyLoad = {}, courses = [] } = this.props;

    return (
      <section>
        <div className="header bold">V. STUDY LOAD</div>
        <div className="right">
          <label>Degree enrolled in:</label>
          <div
            className="blank-field"
            style={{ width: 150, marginRight: '3em' }}
          >
            {!!studyLoad && studyLoad.degree}
          </div>

          <label>University enrolled in:</label>
          <div className="blank-field" style={{ width: 150 }}>
            {!!studyLoad && studyLoad.university}
          </div>
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
              {!!studyLoad &&
                (studyLoad.fullLeaveWithPay ? 'X' : <span>&nbsp;</span>)}
            </div>
            <label>No</label>
            <div className="blank-field" style={{ width: 50 }}>
              {!!studyLoad &&
                (!studyLoad.fullLeaveWithPay ? 'X' : <span>&nbsp;</span>)}
            </div>
          </div>
          <div>
            <label>Recipient of faculty fellowship?</label>
            <label>Yes</label>
            <div
              className="blank-field"
              style={{ width: 50, marginRight: '1em' }}
            >
              {!!studyLoad &&
                (!!studyLoad.fellowshipRecipient ? 'X' : <span>&nbsp;</span>)}
            </div>
            <label>No</label>
            <div className="blank-field" style={{ width: 50 }}>
              {!!studyLoad &&
                (!studyLoad.fellowshipRecipient ? 'X' : <span>&nbsp;</span>)}
            </div>
          </div>
        </div>
        <br />
        <div style={{ marginLeft: 40, marginRight: 100 }}>
          FOR FACULTY MEMBERS WITH SOME TEACHING LOAD BUT ALSO HAVE STUDY LOADS:{' '}
          <br />
          Study Load CREDITS (i.e. study load counted as part of normal 12-unit
          faculty load) <br />
          Study Load Units (i.e. study load done above a full teaching load){' '}
          <br />
          <table>
            <tbody>
              <tr>
                <th>Course Number</th>
                <th>Course Credit</th>
                <th>Day/s</th>
                <th>Time</th>
                <th>School</th>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="right">
          <label className="bold">Total Study Load Credits (SLC)</label>
          <div className="blank-field" style={{ width: 130 }}>
            &nbsp;
          </div>
          <br />
          <label className="bold">TOTAL FACULTY LOAD IN CREDIT UNITS</label>
          <div className="blank-field" style={{ width: 130 }}>
            0
          </div>
        </div>
      </section>
    );
  }
}

export default StudyLoad;
