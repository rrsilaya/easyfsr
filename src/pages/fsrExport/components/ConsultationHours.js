import React, { Component } from 'react';
import moment from 'moment';

class ConsultationHours extends Component {
  computeTotalHours = () => {
    const { consultationHours } = this.props;

    return (
      consultationHours.reduce((acc, { timeStart, timeEnd }) => {
        return (
          acc + moment(timeEnd, 'HH:mm:ss').diff(moment(timeStart, 'HH:mm:ss'))
        );
      }, 0) /
      (1000 * 60 * 60)
    );
  };

  render() {
    const { consultationHours } = this.props;

    return (
      <section>
        <div className="header bold">
          VIII. CONSULTATION HOURS: (From U.P. Faculty Manual: "At least 10
          hours per week during regular hours."
        </div>
        <div
          style={{
            marginLeft: 40,
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: 10,
          }}
        >
          <div style={{ flex: 1, marginRight: '1em' }}>
            <div className="center">
              Please specify definite days and hours; avoid "By appointment."
            </div>
            <table style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <th>Days</th>
                  <th>Time</th>
                  <th>Place</th>
                </tr>
                {consultationHours.map(ch => (
                  <tr key={ch.chID}>
                    <td>{ch.day}</td>
                    <td>
                      {moment(ch.timeStart, 'HH:mm:ss').format('hh:mm A')} -{' '}
                      {moment(ch.timeEnd, 'HH:mm:ss').format('hh:mm A')}
                    </td>
                    <td>{ch.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <label>Total hours per week</label>
            <div className="blank-field" style={{ width: 120 }}>
              {this.computeTotalHours()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ConsultationHours;
