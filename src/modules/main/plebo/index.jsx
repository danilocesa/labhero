import React from 'react';

import SearchPleboResult from './search_plebo';
import ResultHeader from './result_header';
import PleboResult from './result_table';

class Plebo extends React.Component {
    render() {
      return (
          <div>
            <div style={{ marginTop: 50 }}>
              <SearchPleboResult />
              <ResultHeader />
              <PleboResult />
            </div>
          </div>
      );
    }
}

export default Plebo;