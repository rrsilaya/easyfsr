import React, { Component } from 'react';

class TeachingLoad extends Component {
  render() {
    const { data } = this.props;
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
          {[].map((row, i) => (
            <tr key={i}>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td className="highlight blue" />
              <td />
              <td className="highlight orange" />
            </tr>
          ))}
          <tr>
            <td className="right" colspan={7}>
              TOTAL Teaching Load Credits
            </td>
            <td className="highlight blue">0</td>
            <td>0</td>
            <td className="highlight orange">0</td>
          </tr>
        </table>
        <div className="bold section-header">
          Concurrent teaching load outside the college.
        </div>
      </div>
    );
  }
}

export default TeachingLoad;
