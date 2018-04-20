import React, { Component } from 'react';

class ConsultationHours extends Component {
  render() {
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
                <tr>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <label>Total hours per week</label>
            <div className="blank-field" style={{ width: 120 }}>
              &nbsp;
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ConsultationHours;
