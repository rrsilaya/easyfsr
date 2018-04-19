import React, { Component, Fragment } from 'react';

const styles = {
  header: {
    marginBottom: '1em',
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    top: 63,
    right: 30,
  },
};

class Header extends Component {
  render() {
    const { meta, user } = this.props;

    return (
      <Fragment>
        <div className="form-float">Form 67 (Revised October 25, 2013)</div>
        <div style={styles.header}>
          <div style={styles.checkbox}>
            [{user.contractType === 'FULL-TIME' ? (
              'x'
            ) : (
              <span>&nbsp;&nbsp;</span>
            )}] <span style={{ marginLeft: '3em' }}>Full-Time</span>
            <br />
            [{user.contractType === 'PART-TIME' ? (
              'x'
            ) : (
              <span>&nbsp;&nbsp;</span>
            )}] <span style={{ marginLeft: '3em' }}>Part-Time</span>
          </div>
          <div className="center" style={{ marginBottom: '1em' }}>
            <header className="bold">FACULTY SERVICE RECORD</header>
            <div>
              {meta.semester} Semester {meta.acadYear}
            </div>
          </div>
          <div className="grid">
            <div className="flex-mid" style={{ width: '75%' }}>
              <label>PRINTED NAME:</label>
              <div className="field-line" data-label="(Family)">
                {user.lastName}
              </div>
              <div className="field-line" data-label="(Given)">
                {user.firstName}
              </div>
              <div className="field-line" data-label="(MI)">
                {user.middleName
                  .split(' ')
                  .map(word => word[0])
                  .join('.') + '.'}
              </div>
            </div>
            <div className="flex-mid margin1 left" style={{ width: '25%' }}>
              <label>RANK:</label>
              <div className="field-line">{user.rank}</div>
            </div>
          </div>
          <div
            className="grid"
            style={{ justifyContent: 'space-between', marginTop: '1.5em' }}
          >
            <div className="flex-mid" style={{ width: '50%' }}>
              <label>HOME DEPARTMENT:</label>
              <div className="field-line" data-label="">
                &nbsp;
              </div>
            </div>
            <div className="flex-mid" style={{ width: '35%' }}>
              <label>HOME COLLEGE:</label>
              <div className="field-line" data-label="">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header;
