import React, { Component } from 'react';

class AdminWork extends Component {
  render() {
    const { adminWorks } = this.props;

    return (
      <section>
        <div className="header bold">III. ADMINISTRATIVE WORK</div>
        <table className="equal">
          <tbody>
            <tr>
              <th colSpan={6}>POSITION/NATURE OF ADMINISTRATIVE WORK</th>
              <th colSpan={3}>OFFICE/UNIT</th>
              <th colSpan={2}>APPROVED CREDIT UNITS</th>
            </tr>
            {adminWorks.map(work => (
              <tr key={work.id}>
                <td colSpan={6}>{work.position}</td>
                <td colSpan={3}>{work.officeUnit}</td>
                <td colSpan={2}>{work.approvedUnits}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={9} className="right">
                Total Administrative Load Credits (ALC)
              </td>
              <td colSpan={2}>0</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default AdminWork;
