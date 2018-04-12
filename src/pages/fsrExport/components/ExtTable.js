import React, { Component, Fragment } from 'react';

class ExtTable extends Component {
  render() {
    const { section, title } = this.props;

    return (
      <Fragment>
        <div className="header bold">
          {section} {title}
        </div>
        <table className="equal">
          <tbody>
            <tr>
              <th colSpan={4}>TITLE OF ACTIVITY/PROGRAM</th>
              <th>NO. OF HOURS INCLUDING PREPARATION</th>
              <th>NO. OF PARTICIPANTS</th>
              <th>DURATION</th>
              <th>ROLE</th>
              <th>FUNDING AGENCY</th>
              <th colSpan={2}>APPROVED CREDIT UNITS</th>
            </tr>
            <tr>
              <td colSpan={9} className="right">
                Total Extension and Community Credits (ELC)
              </td>
              <td colSpan={2}>0</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ExtTable;
