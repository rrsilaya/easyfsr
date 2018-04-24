import React, { Component } from 'react';
import ExtTable from './ExtTable';

class ExtCommServe extends Component {
  render() {
    const { services } = this.props;

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
        <br />
        <ExtTable
          section="IV. A."
          title="TRAININGS"
          data={services.filter(({ type }) => type === 'Training')}
        />
        <ExtTable
          section="IV. B."
          title="INFORMATION DISSEMINATION"
          data={services.filter(
            ({ type }) => type === 'Information Dissemination',
          )}
        />
        <ExtTable
          section="IV. C."
          title="WORKSHOPS"
          data={services.filter(({ type }) => type === 'Workshop')}
        />
        <ExtTable
          section="IV. D."
          title="SYMPOSIUM"
          data={services.filter(({ type }) => type === 'Symposium')}
        />
        <ExtTable
          section="IV. E."
          title="OTHERS (e.g. community action services)"
          data={services.filter(({ type }) => type === 'Others')}
        />
      </section>
    );
  }
}

export default ExtCommServe;
