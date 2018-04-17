import React, { Component } from 'react';
import ExtTable from './ExtTable';

class ExtCommServe extends Component {
  render() {
    return (
      <section>
        <div className="header bold">IV. EXTENSION AND COMMUNITY SERVICE</div>
        <div className="justify">
          (Include all extension and community service this semester and all
          work in the immediately preceding semester which ere not reported at
          that time (even if no load credits or honorarium are recieved.)
          Department Chairs and Deans should affix their initials beside the
          credit units which they approved or endorsed).
        </div>
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
