import React from "react"
import { Table, Input , Button } from 'antd'

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
        <div>
          REMARKS
          <TextArea rows={6} />
        </div>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Button 
            type="primary" 
            shape="round" 
            htmlType="submit"
            style={{ width: 120 }}
          >
            EXTRACT
          </Button>
        </div>
      </div>
    )
  }
}

export default ForScreening;
