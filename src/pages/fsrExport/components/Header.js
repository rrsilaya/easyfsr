import React, { Component } from 'react';

const styles = {
  header: {
    marginBottom: '1em',
  },
};

class Header extends Component {
  render() {
    return (
      <div style={styles.header}>
        <div className="form-float">Form 67 (Revised October 25, 2013)</div>
        <div className="center" style={{ marginBottom: '1em' }}>
          <header className="bold">FACULTY SERVICE RECORD</header>
          <div>First Semester 2011-2012</div>
        </div>
        <div className="grid">
          <div className="flex-mid" style={{ width: '75%' }}>
            <label>PRINTED NAME:</label>
            <div className="field-line" data-label="(Family)">
              sdfkjjkjkjdsf
            </div>
            <div className="field-line" data-label="(Given)">
              sdfkjjkjkjdsf
            </div>
            <div className="field-line" data-label="(MI)">
              sdfkjjkjkjdsf
            </div>
          </div>
          <div className="flex-mid margin1 left" style={{ width: '25%' }}>
            <label>RANK:</label>
            <div className="field-line">&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
