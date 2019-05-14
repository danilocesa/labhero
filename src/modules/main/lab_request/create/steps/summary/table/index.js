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
    key: 's1',
    section: 'HEMATHOLOGY',
    exam: 'CBC',
    specimen: 'BLOOD',
  },
  {
    key: 's2',
    section: 'HEMATHOLOGY',
    exam: 'PROTHROMBIN TIME',
    specimen: 'SERUM',
  },
  {
    key: 's3',
    section: 'HEMATHOLOGY',
    exam: 'EXPANDED APTT',
    specimen: 'SERUM',
  },
  {
    key: 's4',
    section: 'CHEMISTRY',
    exam: 'BUN',
    specimen: 'SERUM',
  },
  {
    key: 's5',
    section: 'CHEMISTRY',
    exam: 'POTASSIUM',
    specimen: 'SERUM',
  },
  {
    key: 's6',
    section: 'HEMATHOLOGY',
    exam: 'CBC',
    specimen: 'BLOOD',
  },
  {
    key: 's7',
    section: 'HEMATHOLOGY',
    exam: 'PROTHROMBIN TIME',
    specimen: 'SERUM',
  },
  {
    key: 's8',
    section: 'HEMATHOLOGY',
    exam: 'EXPANDED APTT',
    specimen: 'SERUM',
  },
  {
    key: 's9',
    section: 'CHEMISTRY',
    exam: 'BUN',
    specimen: 'SERUM',
  },
  {
    key: 's10',
    section: 'CHEMISTRY',
    exam: 'POTASSIUM',
    specimen: 'SERUM',
  },
];

class SummaryTable extends React.Component {
  render() {
    return (
      <Row style={{ marginTop: 20 }}>
        <Col sm={{ span: 24 }} lg={{ span: 18, offset: 3 }}>
          <div className="summary-step-table">
            <AntTable columns={columns} pagination={false} dataSource={data} scroll={{ y: 260 }} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default SummaryTable;
