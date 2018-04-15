import React, { Component } from 'react';
import ExtTable from './ExtTable';

class ExtCommServe extends Component {
  render() {
    return (
      <section>
        <div className="header bold">IV. EXTENSION AND COMMUNITY SERVICE</div>
        <ExtTable section="IV. A." title="TRAININGS" />
        <ExtTable section="IV. B." title="INFORMATION DISSEMINATION" />
        <ExtTable section="IV. C." title="WORKSHOPS" />
        <ExtTable section="IV. D." title="SYMPOSIUM" />
        <ExtTable
          section="IV. E."
          title="OTHERS (e.g. community action services)"
        />
      </section>
    );
  }
}

export default ExtCommServe;
