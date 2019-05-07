import React from 'react';
import { Row, Col } from 'antd';

import IresultsTable from './iresultstable';
import Actions from './actions';
import MachinesInstalled from './machines';


class Iresults extends React.Component {
    render() {
        return(
          <Row>
            <Col span={24}>
              <MachinesInstalled />
              <IresultsTable />
              <Actions />
            </Col>
          </Row>
        );
    }
}

export default Iresults;