import React, { Component } from 'react'
import { Table, Drawer } from 'antd';
import BloodRequestDetails from 'modules/blood_bank/blood_request/detail';

const dataSource = [
  {
    priority: 32,
    status: '10 Downing Street',
  },
];

const columns = [
  {
    title: "REQUEST'S ID",
    dataIndex: "donor_id",
  },
  {
    title: 'PRIORITY ',
    dataIndex: 'priority',
    key:'priority'
  },
  {
    title: 'STATUS ',
    dataIndex: 'status',
    key:'status'
  },
  {
    title: 'REQUESTED DATE ',
    dataIndex: 'requested_date',
    key:'requested_date'
  }
];

export class Extendtable extends Component {
  constructor(props) {
    super(props);
    this.state = {displayDrawer: false};
  }


  displayDrawerUpdate= (record) => {
    this.setState({ 
      displayDrawer: true, 
      drawerTitle: 'REQUEST DETAILS',
      drawerButton: 'UPDATE REQUEST',
      disableButton: true,
      selectedRequest: record 
    });
  };

  onCloseDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  render() {
    const {displayDrawer ,drawerTitle, drawerButton, selectedRequest, disableButton} = this.state

    return (
      <div>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          pagination={false}
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                this.displayDrawerUpdate(record)
              }
            }
          }}
        />
        <Drawer
          title={drawerTitle}
          width="60%"
          visible={displayDrawer}
          onClose={this.onCloseDrawer}
          destroyOnClose
        >
          <BloodRequestDetails 
            selectedRequest={selectedRequest}
            onClose={this.onCloseDrawer} 
            drawerButton={drawerButton}
            disableButton={disableButton}
          />
        </Drawer>
      </div>
    )
  }
}

export default Extendtable
