import React, { Component, Fragment } from 'react';
import moment from 'moment';

class ExtTable extends Component {
  render() {
    const { section, title, data } = this.props;

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
              <th>DURATION MM/DD/YY</th>
              <th>ROLE</th>
              <th>FUNDING AGENCY</th>
              <th colSpan={2}>APPROVED CREDIT UNITS</th>
            </tr>
            {data.map(service => (
              <tr key={service.extAndCommServiceID}>
                <td colSpan={4}>{service.title}</td>
                <td>{service.hours}</td>
                <td>{service.participant}</td>
                <td>
                  {moment(service.startDate).format('MM/DD/YY')} -{' '}
                  {moment(service.endDate).format('MM/DD/YY')}
                </td>
                <td>{service.role}</td>
                <td>&nbsp;</td>
                <td colSpan={2}>{service.creditUnit}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={9} className="right">
                Total Extension and Community Credits (ELC)
              </td>
              <td colSpan={2}>
                {data.reduce((acc, { creditUnit }) => acc + creditUnit, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ExtTable;
