import React from 'react';
import { Table as AntTable, Button, Tooltip } from 'antd';

import './table.css';

const columns = handleRemove => {
  const RemoveBtn = (
    <Tooltip title="Remove all">
      <Button type="primary" size="small" icon="delete" onClick={handleRemove} />
    </Tooltip>
  );

  return [
    {
      title: 'SECTION',
      dataIndex: 'section',
      width: 170,
    },
    {
      title: 'EXAM NAME',
      dataIndex: 'exam',
      width: 170,
    },
    {
      title: 'SPECIMEN',
      dataIndex: 'specimen',
      width: 170,
    },
    {
      title: RemoveBtn,
      dataIndex: 'action',
      width: 170,
    },
  ];
};

class SelectTable extends React.Component {
  state = {
    data: [
      {
        key: '1',
        section: 'HEMATHOLOGY',
        exam: 'CBC',
        specimen: 'BLOOD',
        action: <Button type="dashed" icon="close" size="small" style={{ fontSize: 10 }} />,
      },
      {
        key: '2',
        section: 'HEMATHOLOGY',
        exam: 'PROTHROMBIN TIME',
        specimen: 'SERUM',
        action: <Button type="dashed" icon="close" size="small" style={{ fontSize: 10 }} />,
      },
      {
        key: '3',
        section: 'HEMATHOLOGY',
        exam: 'EXPANDED APTT',
        specimen: 'SERUM',
        action: <Button type="dashed" icon="close" size="small" style={{ fontSize: 10 }} />,
      },
      {
        key: '4',
        section: 'CHEMISTRY',
        exam: 'BUN',
        specimen: 'SERUM',
        action: <Button type="dashed" icon="close" size="small" style={{ fontSize: 10 }} />,
      },
      {
        key: '5',
        section: 'CHEMISTRY',
        exam: 'POTASSIUM',
        specimen: 'SERUM',
        action: <Button type="dashed" icon="close" size="small" style={{ fontSize: 10 }} />,
      },
    ],
  };

  removeAllTableItems = () => {
    this.setState({ data: null });
  };

  render() {
    const TableCols = columns(this.removeAllTableItems);

    return (
      <div className="select-step-table">
        <AntTable
          columns={TableCols}
          pagination={false}
          dataSource={this.state.data}
          scroll={{ y: 260 }}
        />
      </div>
    );
  }
}

export default SelectTable;
