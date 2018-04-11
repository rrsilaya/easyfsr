import React, { Component } from 'react';

const styles = {
  signatories: {
    display: 'flex',
    justifyContent: 'center',
  },
  middle: {
    flex: 0.6,
    marginLeft: '3em',
    marginRight: '3em',
  },
};

class TeachingLoad extends Component {
  render() {
    const { teachingLoad } = this.props;
    const headers = [
      'SUBJECT',
      'SECTION CODE',
      'ROOM',
      'DAYS',
      'TIME',
      'HOURS PER WEEK',
      'NO. OF STUDENTS',
      'COURSE CREDIT W/O MULTIPLIERS',
      'STUDENT CREDIT UNITS',
      'TEACHING LOAD CREDITS WITH MULTIPLIERS',
    ];

    return (
      <div>
        <div className="header bold">I. TEACHING LOAD in the COLLEGE: </div>
        <table>
          <tbody>
            <tr>
              {headers.map((header, i) => (
                <th
                  style={{ width: '10%' }}
                  className={`highlight ${
                    i === 7 ? 'blue' : i === 9 ? 'orange' : ''
                  }`}
                  key={i}
                >
                  {header}
                </th>
              ))}
            </tr>
            {teachingLoad.map(subject => (
              <tr key={subject.id}>
                <td>{subject.subjectCode}</td>
                <td>{subject.sectionCode}</td>
                <td>{subject.room}</td>
                <td />
                <td />
                <td>{subject.hoursPerWeek}</td>
                <td>{subject.noOfStudents}</td>
                <td className="highlight blue" />
                <td />
                <td className="highlight orange">
                  {subject.teachingLoadCreds}
                </td>
              </tr>
            ))}
            <tr>
              <td className="right" colSpan={7}>
                TOTAL Teaching Load Credits
              </td>
              <td className="highlight blue">0</td>
              <td>0</td>
              <td className="highlight orange">0</td>
            </tr>
          </tbody>
        </table>
        <div className="bold section-header">
          Concurrent teaching load outside the college.
        </div>
        <div className="mvertical" style={styles.signatories}>
          <div
            className="field-line"
            data-label="COLLEGE OUTSIDE THE UP SYSTEM"
          >
            &nbsp;
          </div>
          <div
            className="field-line"
            style={styles.middle}
            data-label="NO. OF SUBJECTS"
          >
            &nbsp;
          </div>
          <div className="field-line" data-label="NO. OF UNITS">
            &nbsp;
          </div>
        </div>
        <div className="mvertical" style={styles.signatories}>
          <div className="field-line" data-label="UP COLLEGE / DEPARTMENT">
            &nbsp;
          </div>
          <div
            className="field-line"
            style={styles.middle}
            data-label="NO. OF SUBJECTS"
          >
            &nbsp;
          </div>
          <div className="field-line" data-label="NO. OF UNITS">
            &nbsp;
          </div>
        </div>
        <div className="bold justify">
          NOTE: A faculty member teaching in another college and/or another
          Constituent University (CU) should file a separate Form 67 (FSR) in
          that college and/or CU. In the event that a 2nd or 3rd FSR needs to be
          prepared, only the teaching load and consultation hour should be
          completed. Permission from the Chancellor should be sought before
          teaching outside the University.
        </div>
      </div>
    );
  }
}

export default TeachingLoad;
