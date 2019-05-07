import React from 'react';

import PleboSearch from './plebosearch';
import PleboHeader from './pleboheader';
import PleboTable from './plebotable';

class Plebo extends React.Component {
    render() {
      return (
        <div>
          <div style={{ marginTop: 50 }}>
            <PleboSearch />
            <PleboHeader />
            <PleboTable />
          </div>
        </div>
      );
    }
}

export default Plebo;