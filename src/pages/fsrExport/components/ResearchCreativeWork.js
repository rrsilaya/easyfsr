import React, { Component } from 'react';
import CreativeTable from './CreativeTable';

class ResearchCreativeWork extends Component {
  render() {
    const { creativeWorks } = this.props;

    return (
      <section>
        <div className="header bold">
          II. RESEARCH/TEXTBOOK WRITING/CREATIVE WORK
        </div>
        <div className="header bold">II. A. RESEARCH</div>

        {/* Reseach Proposal */}
        <div className="header bold">II. A1. RESEARCH PROPOSAL</div>
        <table className="equal">
          <tbody>
            <tr>
              <th colSpan={3}>TITLE</th>
              <th>ROLE</th>
              <th colSpan={3}>CO-WORKERS INVOLVED</th>
              <th colSpan={2}>FUNDING AGENCY</th>
              <th colSpan={2}>APPROVED CREDIT UNITS</th>
            </tr>
            <tr>
              <td colSpan={3}>&nbsp;</td>
              <td>&nbsp;</td>
              <td colSpan={3}>&nbsp;</td>
              <td colSpan={2}>&nbsp;</td>
              <td colSpan={2}>&nbsp;</td>
            </tr>
            <tr>
              <td colSpan={9} className="right">
                Total Research Work Load Credits (RLC)
              </td>
              <td colSpan={2}>0</td>
            </tr>
          </tbody>
        </table>

        {/* Reseach Implementation */}
        <div className="header bold">II. A2. RESEARCH IMPLEMENTATION</div>
        <table className="equal">
          <tbody>
            <tr>
              <th colSpan={3}>TITLE (SPECIFY COMPLETE TITLE)</th>
              <th>ROLE</th>
              <th colSpan={2}>CO-WORKERS INVOLVED</th>
              <th>
                START DATE<br />MM/DD/YY
              </th>
              <th>
                END DATE<br />MM/DD/YY
              </th>
              <th>FUNDING AGENCY</th>
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

        <div className="header bold">II. B. CREATIVE WORK</div>
        <CreativeTable
          section="II. B1."
          title="ORAL/POSTER PAPERS PRESENTED IN CONFERENCES"
          data={creativeWorks.filter(work => work.type === 'Oral/Poster')}
        />
        <CreativeTable
          section="II. B2."
          title="PAPERS PUBLISHED IN PROCEEDINGS OF CONFERENCES"
          data={creativeWorks.filter(work => work.type === 'PublishedPapers')}
        />
        <CreativeTable
          section="II. B3."
          title="MONOGRAPHS: manuals, training modules"
          data={creativeWorks.filter(work => work.type === 'Monograph')}
        />
        <CreativeTable
          section="II. B4."
          title="ARTICLES IN REFERRED JOURNALS"
          data={creativeWorks.filter(work => work.type === 'Article')}
        />
        <CreativeTable
          section="II. B5."
          title="CHAPTERS IN A BOOK"
          data={creativeWorks.filter(work => work.type === 'ChapterInABook')}
        />
        <CreativeTable
          section="II. B6."
          title="BOOKS"
          data={creativeWorks.filter(work => work.type === 'Books')}
        />
        <CreativeTable
          section="II. B7."
          title="OTHERS"
          data={creativeWorks.filter(work => work.type === 'Others')}
        />
      </section>
    );
  }
}

export default ResearchCreativeWork;
