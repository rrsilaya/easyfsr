import React, { Component } from 'react';

class Certification extends Component {
  render() {
    return (
      <section>
        <div className="header bold">
          IX. CETIFICATION: The faculty member certifies that all the
          information provided above are correct as of the date of signing. By
          signing below, the Department Chair certifies to the correctness of
          the reported data on teaching, administrative and study load inside
          the college. (PRINTED NAMES AND SIGNATURES){' '}
        </div>
        <br />
        <div className="flex-mid">
          <div className="field-line" data-label="Faculty">
            &nbsp;
          </div>
          <div className="field-line" data-label="Director/Chairman">
            &nbsp;
          </div>
          <div className="field-line" data-label="College Secretary">
            &nbsp;
          </div>
          <div className="field-line" data-label="Dean">
            &nbsp;
          </div>
        </div>
        <div className="flex-mid" style={{ justifyContent: 'space-around' }}>
          <div style={{ width: 120 }}>Date: </div>
          <div style={{ width: 120 }}>Date: </div>
          <div style={{ width: 120 }}>Date: </div>
          <div style={{ width: 120 }}>Date: </div>
        </div>
        <div className="justify">
          NOTE: Every faculty member in residence (i.e. receiving salary in UP)
          including those on full study leave with pay, fellowship or sabbatical
          is required to fill up a Faculty Service Record every semester or
          trimester. File copies of this form shall be maintained in the
          department, in the college and at the Office of the Vice Chancellor
          for Academic Affairs.
        </div>
      </section>
    );
  }
}

export default Certification;
