import React from "react"
import { Table, Input  } from 'antd'

// CUSTOM MODULES

const { TextArea } = Input;
const columns = [
  {
    title: 'EXAM',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'RESULT',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'UNIT CODE',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'STATUS',
    dataIndex: 'address',
    key: 'address',
  },
];

class ForScreening extends React.Component {

  render() {
    return (
      <div>
        <Table 
          columns={columns} 
        />
        <div style={{ padding:50 }}>
          REMARK
          <TextArea rows={4} style={{height:90}} />
        </div>
      </div>
    )
  }
}

export default ForScreening;
