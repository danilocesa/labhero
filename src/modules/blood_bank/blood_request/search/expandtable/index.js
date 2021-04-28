import React, { Component,  } from 'react'
import PropTypes from 'prop-types';
import { Table, Drawer, Button } from 'antd';
import BloodRequestDetails from 'modules/blood_bank/blood_request/detail';



const columns = [
  {
    title: "REQUEST'S ID",
    dataIndex: "recipient_id",
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
  },
  {
    // title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <Button>Print</Button>,
  },
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
    const {record} = this.props
    const data = [record]
    const {displayDrawer ,drawerTitle, drawerButton, selectedRequest, disableButton} = this.state

    return (
      <div>
        <Table 
          dataSource={data} 
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


Extendtable.propTypes = {
	record: PropTypes.object.isRequired
}

export default Extendtable
