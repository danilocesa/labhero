import React from 'react';
import { Table as AntTable, Row, Col } from 'antd';

import './table.css';

const columns = [
  {
    title: 'SECTION',
    dataIndex: 'section',
    width: '33%',
  },
  {
    title: 'EXAM NAME',
    dataIndex: 'exam',
    width: '33%',
    align: 'center',
  },
  {
    title: 'SPECIMEN',
    dataIndex: 'specimen',
    width: '33%',
    align: 'center',
  },
];

const data = [
  {
    key: '1',
    section: 'HEMATHOLOGY',
    exam: 'CBC',
    specimen: 'BLOOD',
  },
  {
    key: '2',
    section: 'HEMATHOLOGY',
    exam: 'PROTHROMBIN TIME',
    specimen: 'SERUM',
  },
  {
    key: '3',
    section: 'HEMATHOLOGY',
    exam: 'EXPANDED APTT',
    specimen: 'SERUM',
  },
  {
    key: '4',
    section: 'CHEMISTRY',
    exam: 'BUN',
    specimen: 'SERUM',
  },
  {
    key: '5',
    section: 'CHEMISTRY',
    exam: 'POTASSIUM',
    specimen: 'SERUM',
  },
  {
    key: '6',
    section: 'HEMATHOLOGY',
    exam: 'CBC',
    specimen: 'BLOOD',
  },
  {
    key: '7',
    section: 'HEMATHOLOGY',
    exam: 'PROTHROMBIN TIME',
    specimen: 'SERUM',
  },
  {
    key: '8',
    section: 'HEMATHOLOGY',
    exam: 'EXPANDED APTT',
    specimen: 'SERUM',
  },
  {
    key: '9',
    section: 'CHEMISTRY',
    exam: 'BUN',
    specimen: 'SERUM',
  },
  {
    key: '10',
    section: 'CHEMISTRY',
    exam: 'POTASSIUM',
    specimen: 'SERUM',
  },
];

class SummaryTable extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <div className="summary-step-table">
            <AntTable columns={columns} pagination={false} dataSource={data} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default SummaryTable;
