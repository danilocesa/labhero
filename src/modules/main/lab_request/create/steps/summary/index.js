import React from 'react';

import Tracker from '../../tracker';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';

class SummaryStep extends React.Component {
  render() {
    return (
      <div>
        <Tracker active={3} />
        <SummarySection />
        <SummaryTable />
        <br />
        <SummaryFooter />
      </div>
    );
  }
}

export default SummaryStep;
