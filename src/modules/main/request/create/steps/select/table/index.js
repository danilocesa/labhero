import React from 'react';
import { Table as AntTable, Icon } from 'antd';

import './table.css';

const columns = [
  {
    title: 'SECTION',
    dataIndex: 'section',
    width: 170
  }, 
  {
    title: 'EXAM NAME',
    dataIndex: 'exam',
    width: 170
  }, 
  {
    title: 'SPECIMEN',
    dataIndex: 'specimen',
    width: 170
  },
  {
    title: '',
    dataIndex: 'action',
  }
];

const data = [
  {
    key: '1',
    section: 'HEMATHOLOGY',
    exam: 'CBC',
    specimen: 'BLOOD',
    action: <Icon type="close" style={{ fontSize: 12 }} />
  },
  {
    key: '2',
    section: 'HEMATHOLOGY',
    exam: 'PROTHROMBIN TIME',
    specimen: 'SERUM',
    action: <Icon type="close" style={{ fontSize: 12 }} />
  },
  {
    key: '3',
    section: 'HEMATHOLOGY',
    exam: 'EXPANDED APTT',
    specimen: 'SERUM',
    action: <Icon type="close" style={{ fontSize: 12 }} />
  },
  {
    key: '4',
    section: 'CHEMISTRY',
    exam: 'BUN',
    specimen: 'SERUM',
    action: <Icon type="close" style={{ fontSize: 12 }} />
  },
  {
    key: '5',
    section: 'CHEMISTRY',
    exam: 'POTASSIUM',
    specimen: 'SERUM',
    action: <Icon type="close" style={{ fontSize: 12 }} />
  }
];

class SelectTable extends React.Component {
  render() {
    return (
      <div className="select-step-table">
        <AntTable columns={columns} 
                  pagination={false}
                  dataSource={data} 
                  scroll={{ y: 260 }} />
      </div>
    );
  }
}

export default SelectTable;

