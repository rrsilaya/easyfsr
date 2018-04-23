import React, { Component, Fragment } from 'react';
import moment from 'moment';

class CreativeTable extends Component {
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
              <th colSpan={4}>TITLE</th>
              <th colSpan={2}>CO-WORKERS INVOLVED</th>
              <th colSpan={3}>DATE OF PUBLICATION/COMPLETION</th>
              <th colSpan={2}>APPROVED CREDIT UNITS</th>
            </tr>
            {data.map(row => (
              <tr key={row.id}>
                <td colSpan={4}>{row.title}</td>
                <td colSpan={2}>{row.coAuthor}</td>
                <td colSpan={3}>{moment(row.date).format('MM/DD/YY')}</td>
                <td colSpan={2}>{row.credUnit}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={9} className="right">
                Creative Work Load Credits (CLC)
              </td>
              <td colSpan={2}>
                {data.reduce((acc, { credUnit }) => acc + credUnit, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default CreativeTable;
