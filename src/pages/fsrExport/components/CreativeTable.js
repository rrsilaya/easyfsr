import React, { Component, Fragment } from 'react';

class CreativeTable extends Component {
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
              <th colSpan={4}>TITLE</th>
              <th colSpan={2}>CO-WORKERS INVOLVED</th>
              <th colSpan={3}>DATE OF PUBLICATION/COMPLETION</th>
              <th colSpan={2}>APPROVED CREDIT UNITS</th>
            </tr>
            <tr>
              <td colSpan={9} className="right">
                Total Research Work Load Credits (RLC)
              </td>
              <td colSpan={2}>0</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default CreativeTable;
